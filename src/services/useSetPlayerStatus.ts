import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_BASE_URL } from "./constants";

type SetPlayerStatusPayload = {
  status: boolean;
};
type SetPlayerStatusResponse = {
  success: boolean;
};
const useSetPlayerStatus = () => {
  const { mutate: setPlayerStatus } = useMutation<
    AxiosResponse<SetPlayerStatusResponse>,
    AxiosError,
    SetPlayerStatusPayload
  >({
    mutationFn: (payload: SetPlayerStatusPayload) => {
      return axios.patch(`${API_BASE_URL}/game/ready`, payload, {
        withCredentials: true,
      });
    },
  });
  return setPlayerStatus;
};

export default useSetPlayerStatus;
