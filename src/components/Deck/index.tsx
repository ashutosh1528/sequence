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
  const isCardPicked = useSelector(
    (state: RootState) => state.game.isCardPicked
  );
  const array = Array.from({ length: 10 });

  const handleDeckClick = () => {
    if (isCoinPlacedInTurn && !isCardPicked) {
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
      <div className="deck__container__pile" onClick={handleDeckClick}>
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
