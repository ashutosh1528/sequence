import { useQueryClient } from "@tanstack/react-query";
import useGetNewCard from "../../services/useGetNewCard";
import BackCard from "../../assets/cards/JJ.svg";
import "./index.scss";

const Deck = () => {
  const queryClient = useQueryClient();
  const getNewCard = useGetNewCard();

  const array = Array.from({ length: 5 });

  const handleDeckClick = () => {
    getNewCard(
      {},
      {
        onSuccess: (res) => {
          if (res.data.isSuccess) {
            queryClient.invalidateQueries({
              queryKey: ["getCards"],
              exact: false,
            });
          }
        },
      }
    );
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
    </div>
  );
};

export default Deck;
