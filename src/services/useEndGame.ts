import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "./constants";

const useEndGame = () => {
  const { mutate: endGame } = useMutation({
    mutationFn: (payload: {}) => {
      return axios.post(`${API_BASE_URL}/game/endGame`, payload, {
        withCredentials: true,
      });
    },
  });
  return endGame;
};

export default useEndGame;
