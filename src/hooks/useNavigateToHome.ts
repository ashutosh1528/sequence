import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { GAME_ID_COOKIE, PLAYER_ID_COOKIE } from "../constants";

const useNavigateToHome = () => {
  const navigate = useNavigate();
  return () => {
    Cookies.remove(GAME_ID_COOKIE);
    Cookies.remove(PLAYER_ID_COOKIE);
    navigate("/");
  };
};

export default useNavigateToHome;
