import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import CreatePage from "./pages/Create";
import JoinPage from "./pages/Join";
import WaitingPage from "./pages/Waiting";
import LockPage from "./pages/Lock";
import GamePage from "./pages/Game";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
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
