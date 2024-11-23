import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_BASE_URL } from "./constants";

type EndPlayerTurnPayload = {};
type EndPlayerTurnResponse = {
  isSuccess: boolean;
};
const useEndPlayerTurn = () => {
  const { mutate: endPlayerTurn } = useMutation<
    AxiosResponse<EndPlayerTurnResponse>,
    AxiosError,
    EndPlayerTurnPayload
  >({
    mutationFn: () => {
      return axios.patch(
        `${API_BASE_URL}/player/endTurn`,
        {},
        { withCredentials: true }
      );
    },
  });
  return endPlayerTurn;
};

export default useEndPlayerTurn;
