import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "../styles/homePage.scss";

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateGame = () => {
    navigate("/create");
  };

  const handleJoinGame = () => {
    navigate("/join");
  };

  return (
    <div className="home__container">
      <h1 className="home__title">Sequence</h1>
      <div className="home__container__button">
        <Button label="Create Game" size="large" onClick={handleCreateGame} />
        <Button label="Join Game" size="large" onClick={handleJoinGame} />
      </div>
    </div>
  );
};

export default HomePage;
