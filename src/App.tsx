import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import CreatePage from "./pages/Create";
import JoinPage from "./pages/Join";
import WaitingPage from "./pages/Waiting";
import LockPage from "./pages/Lock";
import GamePage from "./pages/Game";

const App = () => {
  return (
    <div style={{ padding: 8, height: "98vh" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="create" element={<CreatePage />} />
        <Route path="join" element={<JoinPage />} />
        <Route path="waiting" element={<WaitingPage />} />
        <Route path="lock" element={<LockPage />} />
        <Route path="game" element={<GamePage />} />
      </Routes>
    </div>
  );
};

export default App;
