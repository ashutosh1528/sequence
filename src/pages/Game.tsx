import Board from "../components/Board";
import Controls from "../components/Controls";
import Deck from "../components/Deck";
import Hand from "../components/Hand";
import LastCardPlayed from "../components/LastCardPlayed";
import Score from "../components/Score";
import TurnOrder from "../components/TurnOrder";
import "../styles/gamePage.scss";

const GamePage = () => {
  return (
    <div className="game__container">
      <div className="game__container__board">
        <Board />
      </div>
      <div className="game__container__panel">
        <div className="game__title">Sequence</div>
        <div className="game__container__scoreTurn">
          <Score />
          <TurnOrder />
        </div>
        <div className="game__container__deck">
          <Deck />
          <LastCardPlayed />
        </div>
        <div className="game__bottom">
          <Hand />
          <Controls />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
