import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { GAME_ID_COOKIE, PLAYER_ID_COOKIE } from "../constants";
import axios from "axios";
import { API_BASE_URL } from "./constants";

export type Cell = {
  id: string;
  face: string;
  teamId: string;
};
type GetBoardResponse = {
  isSuccess: boolean;
  board: Cell[][];
};
const useGetBoard = () => {
  const gameId = Cookies.get(GAME_ID_COOKIE) || "";
  const playerId = Cookies.get(PLAYER_ID_COOKIE) || "";

  return useQuery<GetBoardResponse>({
    queryKey: ["getBoard", gameId, playerId],
    enabled: !!gameId && !!playerId,
    retry: 0,
    gcTime: Infinity,
    staleTime: Infinity, // Ensures data is never considered stale
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: () => {
      return axios
        .get(`${API_BASE_URL}/game/getBoard`, { withCredentials: true })
        .then((res) => res.data);
    },
  });
};

export default useGetBoard;
