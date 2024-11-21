import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "./constants";
import axios, { AxiosError, AxiosResponse } from "axios";

type StartGamePayload = {};
type StartGameResponse = {
  isSuccess: boolean;
};
const useStartGame = () => {
  const { mutate: startGame } = useMutation<
    AxiosResponse<StartGameResponse>,
    AxiosError,
    StartGamePayload
  >({
    mutationFn: () => {
      return axios.patch(
        `${API_BASE_URL}/game/start`,
        {},
        {
          withCredentials: true,
        }
      );
    },
  });
  return startGame;
};

export default useStartGame;
