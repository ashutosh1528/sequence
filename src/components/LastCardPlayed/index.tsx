import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CardIcon from "../CardIcon";
import "./index.scss";

const LastCardPlayed = () => {
  const cardFace = useSelector((state: RootState) => state.game.lastCardPlayed);
  return (
    <div className="lastCardPlayed__container">
      <div className="lastCardPlayed__container__card">
        {cardFace && <CardIcon name={cardFace} width={100} />}
      </div>
      <div>Last card played</div>
    </div>
  );
};

export default LastCardPlayed;
