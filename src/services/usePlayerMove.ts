import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_BASE_URL } from "./constants";

type PlayerMoveResponse = {
  isSuccess: boolean;
};
type PlayerMovePayload = {
  cardFace: string;
  cellId: string;
};
const usePlayerMove = () => {
  const { mutate: playerMove } = useMutation<
    AxiosResponse<PlayerMoveResponse>,
    AxiosError,
    PlayerMovePayload
  >({
    mutationFn: (payload: PlayerMovePayload) => {
      return axios.patch(`${API_BASE_URL}/player/move`, payload, {
        withCredentials: true,
      });
    },
  });
  return playerMove;
};

export default usePlayerMove;
