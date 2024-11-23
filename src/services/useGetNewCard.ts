import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_BASE_URL } from "./constants";

type GetNewCardPayload = {};
type GetNewCardResponse = {
  isSuccess: boolean;
};
const useGetNewCard = () => {
  const { mutate: getNewCard } = useMutation<
    AxiosResponse<GetNewCardResponse>,
    AxiosError,
    GetNewCardPayload
  >({
    mutationFn: () => {
      return axios.patch(
        `${API_BASE_URL}/player/getCard`,
        {},
        { withCredentials: true }
      );
    },
  });
  return getNewCard;
};

export default useGetNewCard;
