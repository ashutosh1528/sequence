import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "./constants";

type CreateGamePayload = {
  playerName: string;
};

const useCreateGame = () => {
  const { mutate: createGame } = useMutation({
    mutationFn: (payload: CreateGamePayload) => {
      return axios.post(`${API_BASE_URL}/game`, payload, {
        withCredentials: true,
      });
    },
  });
  return createGame;
};

export default useCreateGame;
