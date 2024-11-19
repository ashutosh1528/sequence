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
      return axios.patch(
        `${API_BASE_URL}/game/kick`,
        {
          playerId: payload?.playerId || "",
        },
        {
          withCredentials: true,
        }
      );
    },
  });
  return kickPlayer;
};

export default useKickPlayer;
