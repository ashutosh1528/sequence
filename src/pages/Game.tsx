import Board from "../components/Board";
import Controls from "../components/Controls";
import Deck from "../components/Deck";
import Hand from "../components/Hand";
import "../styles/gamePage.scss";

const GamePage = () => {
  return (
    <div className="game__container">
      <div className="game__container__board">
        <Board />
      </div>
      <div className="game__container__panel">
        <div className="game__title">Sequence</div>
        <Deck />
        <div className="game__bottom">
          <Hand />
          <Controls />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
