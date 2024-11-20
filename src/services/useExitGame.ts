import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_BASE_URL } from "./constants";

type ExitGamePayload = {};
type ExitGameResponse = {
  isSuccess: boolean;
};
const useExitGame = () => {
  const { mutate: exitGame } = useMutation<
    AxiosResponse<ExitGameResponse>,
    AxiosError,
    ExitGamePayload
  >({
    mutationFn: () => {
      return axios.patch(
        `${API_BASE_URL}/game/exit`,
        {},
        {
          withCredentials: true,
        }
      );
    },
  });
  return exitGame;
};

export default useExitGame;
