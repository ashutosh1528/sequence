import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_BASE_URL } from "./constants";

type DiscardCardResponse = {
  isSuccess: boolean;
  errorMessage?: string;
};
type DiscardCardPayload = {
  cardFace: string;
};
const useDiscardCard = () => {
  const { mutate: discardCard } = useMutation<
    AxiosResponse<DiscardCardResponse>,
    AxiosError,
    DiscardCardPayload
  >({
    mutationFn: (payload) => {
      return axios.patch(`${API_BASE_URL}/player/discardCard`, payload, {
        withCredentials: true,
      });
    },
  });
  return discardCard;
};

export default useDiscardCard;
