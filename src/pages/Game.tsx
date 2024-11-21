import Board from "../components/Board";
import CardIcon from "../components/CardIcon";
import useGetCards from "../services/useGetCards";

const GamePage = () => {
  const { data } = useGetCards();
  console.log(data);
  return (
    <div>
      {/* {data?.cards.map((card) => (
          <CardIcon name={card} />
        ))} */}
      <Board />
    </div>
  );
};

export default GamePage;
