import { useState } from "react";
import useGetCards from "../../services/useGetCards";
import CardIcon from "../CardIcon";
import "./index.scss";
import { useDispatch } from "react-redux";
import {
  setBoardCellsToHighlight,
  setBoardCellsToUnhighlight,
} from "../../store/slices/game.slice";

const Hand = () => {
  const dispatch = useDispatch();
  const { data } = useGetCards();
  const [selectedCard, setSelectedCard] = useState("");

  const raiseHand = (card: string) => {
    if (card) {
      const cardDiv = document.getElementById(
        `${card}-inhand`
      ) as HTMLDivElement;
      let transformValue = cardDiv.style.getPropertyValue("transform");
      transformValue = `${transformValue} translateY(-25px)`;
      cardDiv.style.setProperty("transform", transformValue);
      dispatch(setBoardCellsToHighlight(card || ""));
    }
  };

  const lowerHand = (card: string) => {
    if (card) {
      const cardDiv = document.getElementById(
        `${card}-inhand`
      ) as HTMLDivElement;
      let transformValue = cardDiv.style.getPropertyValue("transform");
      transformValue = transformValue.split(" ")[0];
      cardDiv.style.setProperty("transform", transformValue);
      dispatch(setBoardCellsToUnhighlight(card || ""));
    }
  };

  const handleOnCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget.dataset.cardface;
    raiseHand(card || "");
    lowerHand(selectedCard || "");
    if (card === selectedCard) {
      setSelectedCard("");
    } else {
      setSelectedCard(card || "");
    }
  };

  return (
    <div className="hand">
      <div className="hand__container">
        {data?.cards?.map((card, idx) => {
          const angle = -20 + idx * 10;
          return (
            <div
              style={{ transform: `rotate(${angle}deg)` }}
              className="hand__card"
              onClick={handleOnCardClick}
              data-cardface={card}
              id={`${card}-inhand`}
              key={`${card}-${idx}`}
            >
              <CardIcon name={card} width={120} />
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 20 }}>Your cards</div>
    </div>
  );
};

export default Hand;
