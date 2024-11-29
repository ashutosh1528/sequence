import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import useGetNewCard from "../../services/useGetNewCard";
import BackCard from "../../assets/cards/JJ.svg";
import { RootState } from "../../store";
import "./index.scss";
import { setIsCardPicked } from "../../store/slices/game.slice";

const Deck = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const getNewCard = useGetNewCard();

  const isCoinPlacedInTurn = useSelector(
    (state: RootState) => state.game.isCoinPlacedInTurn
  );
  const isCardPickedInTurn = useSelector(
    (state: RootState) => state.game.isCardPickedInTurn
  );
  const isDeclaringSequence = useSelector(
    (state: RootState) => state.game.isDeclaringSequence
  );
  const array = Array.from({ length: 10 });

  const handleDeckClick = () => {
    if (isCoinPlacedInTurn && !isCardPickedInTurn && !isDeclaringSequence) {
      getNewCard(
        {},
        {
          onSuccess: (res) => {
            if (res.data.isSuccess) {
              queryClient.invalidateQueries({
                queryKey: ["getCards"],
                exact: false,
              });
              dispatch(setIsCardPicked(true));
            }
          },
        }
      );
    }
  };

  return (
    <div className="deck__container">
      <div
        className="deck__container__pile"
        style={{ opacity: isDeclaringSequence ? "0.2" : "" }}
        onClick={handleDeckClick}
      >
        {array.map((_, index) => (
          <img
            src={BackCard}
            className="deck__img"
            style={{
              transform: `translate(${index + 4}px, ${index + 2}px)`,
              zIndex: 5 - index,
            }}
          />
        ))}
      </div>
      <div className="deck__title">Deck</div>
    </div>
  );
};

export default Deck;
