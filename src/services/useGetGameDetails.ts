import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "./constants";
import { setInitalPlayerList } from "../store/slices/players.slice";
import { setInitalUserDetails } from "../store/slices/user.slice";
import { GAME_ID_COOKIE, PLAYER_ID_COOKIE } from "../constants";
import { setTeams } from "../store/slices/teams.slice";

export enum GAME_STATUS {
  "HOME" = "HOME",
  "LOCK" = "LOCK",
  "WAITING" = "WAITING",
  "GAME" = "GAME",
}
type PlayerDetails = {
  id: string;
  name: string;
  isAdmin: boolean;
  isOnline: boolean;
  isReady: boolean;
};
type TeamDetails = {
  id: string;
  players: string[];
  score: number;
  color: string;
};
type GetGameDetailsResponse = {
  gameId: string;
  playerId: string;
  isActive: boolean;
  isStarted: boolean;
  isLocked: boolean;
  players: Record<string, PlayerDetails>;
  gameStatus: GAME_STATUS;
  teams: Record<string, TeamDetails>;
};

const useGetGameDetails = () => {
  const gameId = Cookies.get(GAME_ID_COOKIE) || "";
  const playerId = Cookies.get(PLAYER_ID_COOKIE) || "";
  const dispatch = useDispatch();
  return useQuery<GetGameDetailsResponse>({
    queryKey: [gameId, playerId],
    enabled: !!gameId && !!playerId,
    retry: 0,
    gcTime: Infinity,
    staleTime: Infinity, // Ensures data is never considered stale
    queryFn: () => {
      return axios
        .get(`${API_BASE_URL}/game`, { withCredentials: true })
        .then((res) => res.data);
    },
    select: (data) => {
      dispatch(setInitalPlayerList(data.players));
      dispatch(
        setInitalUserDetails({
          gameId: data.gameId,
          playerId: data.playerId,
          name: data?.players[data?.playerId].name,
          isAdmin: data?.players[data?.playerId].isAdmin,
          isReady: data?.players[data?.playerId].isReady,
          isOnline: data?.players[data?.playerId].isOnline,
        })
      );
      dispatch(setTeams(data.teams));
      return data;
    },
  });
};

export default useGetGameDetails;
