import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "./constants";
import axios, { AxiosError, AxiosResponse } from "axios";

type LockGameResponse = {
  isSuccess: boolean;
};
type LockGamePayload = {
  status: boolean;
};
const useLockGame = () => {
  const { mutate: lockGame } = useMutation<
    AxiosResponse<LockGameResponse>,
    AxiosError,
    LockGamePayload
  >({
    mutationFn: (payload: LockGamePayload) => {
      return axios.patch(`${API_BASE_URL}/game/lock`, payload, {
        withCredentials: true,
      });
    },
  });
  return lockGame;
};

export default useLockGame;
