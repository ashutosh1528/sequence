import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "./constants";

const useResetGame = () => {
  const { mutate: resetGame } = useMutation({
    mutationFn: (payload: {}) => {
      return axios.post(
        `${API_BASE_URL}/game/resetGame`,
        {},
        { withCredentials: true }
      );
    },
  });
  return resetGame;
};

export default useResetGame;
