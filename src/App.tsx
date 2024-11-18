import { useEffect, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/Home";
import CreatePage from "./pages/Create";
import JoinPage from "./pages/Join";
import WaitingPage from "./pages/Waiting";
import LockPage from "./pages/Lock";
import GamePage from "./pages/Game";
import PrivateRoute from "./components/PrivateRoute";
import useGetGameDetails, { GAME_STATUS } from "./services/useGetGameDetails";
import { useSocket } from "./services/socket/socket";
import useNavigateToHome from "./hooks/useNavigateToHome";

const App = () => {
  const { playerOnlineEvent, playerOfflineEvent } = useSocket();
  const onlineEventRef = useRef(false);
  const navigate = useNavigate();
  const navigateToHome = useNavigateToHome();
  const { data, isLoading, isError } = useGetGameDetails();

  useEffect(() => {
    const status = data?.gameStatus;
    if (status !== GAME_STATUS.HOME && onlineEventRef.current === false) {
      onlineEventRef.current = true;
      playerOnlineEvent();
    }
    if (status === GAME_STATUS.HOME) return navigateToHome();
    if (status === GAME_STATUS.GAME) return navigate("/game");
    if (status === GAME_STATUS.LOCK) return navigate("/lock");
    if (status === GAME_STATUS.WAITING) return navigate("/waiting");
    if (isError) return navigateToHome();
  }, [data?.gameStatus, isError]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      playerOfflineEvent();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
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
