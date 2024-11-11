import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { GAME_ID_COOKIE, PLAYER_ID_COOKIE } from "../constants";

const PrivateRoute = ({ Component }: { Component: () => JSX.Element }) => {
  const gameId = Cookies.get(GAME_ID_COOKIE);
  const playerId = Cookies.get(PLAYER_ID_COOKIE);
  if (gameId && playerId) return <Component />;
  return <Navigate to={"/"} />;
};

export default PrivateRoute;
