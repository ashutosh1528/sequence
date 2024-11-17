import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import HomePage from "./pages/Home";
import CreatePage from "./pages/Create";
import JoinPage from "./pages/Join";
import WaitingPage from "./pages/Waiting";
import LockPage from "./pages/Lock";
import GamePage from "./pages/Game";
import PrivateRoute from "./components/PrivateRoute";
import { GAME_ID_COOKIE, PLAYER_ID_COOKIE } from "./constants";
import useGetGameDetails, { GAME_STATUS } from "./services/useGetGameDetails";

const App = () => {
  const navigate = useNavigate();
  const gameId = Cookies.get(GAME_ID_COOKIE) || "";
  const playerId = Cookies.get(PLAYER_ID_COOKIE) || "";
  const { data, isLoading } = useGetGameDetails({ gameId, playerId });

  useEffect(() => {
    const status = data?.gameStatus;
    if (status === GAME_STATUS.HOME) return navigate("/");
    if (status === GAME_STATUS.GAME) return navigate("/game");
    if (status === GAME_STATUS.LOCK) return navigate("/lock");
    if (status === GAME_STATUS.WAITING) return navigate("/waiting");
  }, [data?.gameStatus]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div style={{ padding: 8, height: "98vh" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="create" element={<CreatePage />} />
        <Route path="join/:gameId?" element={<JoinPage />} />
        <Route
          path="waiting"
          element={<PrivateRoute Component={WaitingPage} />}
        />
        <Route path="lock" element={<PrivateRoute Component={LockPage} />} />
        <Route path="game" element={<PrivateRoute Component={GamePage} />} />
      </Routes>
    </div>
  );
};

export default App;
