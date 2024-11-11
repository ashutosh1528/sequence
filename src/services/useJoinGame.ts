import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_BASE_URL } from "./constants";

type JoinGamePayload = {
  gameId: string;
  playerName: string;
};

type JoinGameResponse = {
  isSuccess: boolean;
  playerId: string;
};

const useJoinGame = () => {
  const { mutate: joinGame } = useMutation<
    AxiosResponse<JoinGameResponse>,
    AxiosError,
    JoinGamePayload
  >({
    mutationFn: (payload: JoinGamePayload) => {
      return axios.patch(`${API_BASE_URL}/game/join`, payload, {
        withCredentials: true,
      });
    },
  });
  return joinGame;
};

export default useJoinGame;
