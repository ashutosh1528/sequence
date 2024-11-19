import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_BASE_URL } from "./constants";

type KickPlayerPayload = {
  playerId: string;
};
type KickPlayerResponse = {
  isSuccess: boolean;
};
const useKickPlayer = () => {
  const { mutate: kickPlayer } = useMutation<
    AxiosResponse<KickPlayerResponse>,
    AxiosError,
    KickPlayerPayload
  >({
    mutationFn: (payload: KickPlayerPayload) => {
      return axios.delete(`${API_BASE_URL}/game/kick`, {
        withCredentials: true,
        data: {
          playerId: payload?.playerId || "",
        },
      });
    },
  });
  return kickPlayer;
};

export default useKickPlayer;
