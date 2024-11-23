import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "./constants";
import { GAME_ID_COOKIE, PLAYER_ID_COOKIE } from "../constants";

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
export type GetGameDetailsResponse = {
  gameId: string;
  playerId: string;
  isActive: boolean;
  isStarted: boolean;
  isLocked: boolean;
  isCoinPlacedInTurn: boolean;
  players: Record<string, PlayerDetails>;
  gameStatus: GAME_STATUS;
  teams: Record<string, TeamDetails>;
};

const useGetGameDetails = () => {
  const gameId = Cookies.get(GAME_ID_COOKIE) || "";
  const playerId = Cookies.get(PLAYER_ID_COOKIE) || "";

  return useQuery<GetGameDetailsResponse>({
    queryKey: ["getGame", gameId, playerId],
    enabled: !!gameId && !!playerId,
    retry: 0,
    gcTime: Infinity,
    staleTime: Infinity, // Ensures data is never considered stale
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: () => {
      return axios
        .get(`${API_BASE_URL}/game`, { withCredentials: true })
        .then((res) => res.data);
    },
  });
};

export default useGetGameDetails;
