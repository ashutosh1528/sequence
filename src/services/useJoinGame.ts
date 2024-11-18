import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_BASE_URL } from "./constants";

type JoinGamePayload = {
  gameId: string;
  playerName: string;
};

type JoinGameResponse = {
  isSuccess: boolean;
  gameId: string;
  id: string;
  name: string;
  isAdmin: boolean;
  isOnline: boolean;
  isReady: boolean;
};

const useJoinGame = () => {
  const { mutate: joinGame } = useMutation<
    AxiosResponse<JoinGameResponse>,
    AxiosError,
    JoinGamePayload
  >({
    mutationFn: (payload: JoinGamePayload) => {
      return axios.put(`${API_BASE_URL}/game/join`, payload, {
        withCredentials: true,
      });
    },
  });
  return joinGame;
};

export default useJoinGame;
