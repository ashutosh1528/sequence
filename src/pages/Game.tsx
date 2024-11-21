import Board from "../components/Board";
import Hand from "../components/Hand";
import "../styles/gamePage.scss";

const GamePage = () => {
  return (
    <div className="game__container">
      <div className="game__container__board">
        <Board />
      </div>
      <div className="game__container__panel">
        <Hand />
      </div>
    </div>
  );
};

export default GamePage;
