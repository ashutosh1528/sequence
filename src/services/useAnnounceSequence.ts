import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_BASE_URL } from "./constants";

type AnnounceSequenceResponse = {
  isSuccess: boolean;
};
type AnnounceSequencePayload = {
  potentialSequence: string[];
};
const useAnnounceSequence = () => {
  const { mutate: announceSequence } = useMutation<
    AxiosResponse<AnnounceSequenceResponse>,
    AxiosError,
    AnnounceSequencePayload
  >({
    mutationFn: (payload) => {
      return axios.patch(`${API_BASE_URL}/player/announceSequence`, payload, {
        withCredentials: true,
      });
    },
  });
  return announceSequence;
};

export default useAnnounceSequence;
