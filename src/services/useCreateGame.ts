import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_BASE_URL } from "./constants";

type CreateGamePayload = {
  playerName: string;
};

type CreateGameResponse = {
  isSuccess: boolean;
  gameId: string;
  playerId: string;
};

const useCreateGame = () => {
  const { mutate: createGame } = useMutation<
    AxiosResponse<CreateGameResponse>,
    AxiosError,
    CreateGamePayload
  >({
    mutationFn: (payload: CreateGamePayload) => {
      return axios.post(`${API_BASE_URL}/game`, payload, {
        withCredentials: true,
      });
    },
  });
  return createGame;
};

export default useCreateGame;
