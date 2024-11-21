import Cookies from "js-cookie";
import { GAME_ID_COOKIE, PLAYER_ID_COOKIE } from "../constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "./constants";

type GetCardsResponse = {
  isSuccess: boolean;
  cards: string[];
};
const useGetCards = () => {
  const gameId = Cookies.get(GAME_ID_COOKIE) || "";
  const playerId = Cookies.get(PLAYER_ID_COOKIE) || "";

  return useQuery<GetCardsResponse>({
    queryKey: ["getCards", gameId, playerId],
    enabled: !!gameId && !!playerId,
    retry: 0,
    gcTime: Infinity,
    staleTime: Infinity, // Ensures data is never considered stale
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: () => {
      return axios
        .get(`${API_BASE_URL}/game/getCards`, { withCredentials: true })
        .then((res) => res.data);
    },
  });
};

export default useGetCards;
