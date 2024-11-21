import useGetCards from "../../services/useGetCards";
import CardIcon from "../CardIcon";
import "./index.scss";

const Hand = () => {
  const { data } = useGetCards();

  return (
    <div className="hand__container">
      {data?.cards?.map((card, idx) => {
        const angle = -20 + idx * 10;
        return (
          <div
            style={{ transform: `rotate(${angle}deg)` }}
            className="hand__card"
          >
            <CardIcon name={card} width={80} />
          </div>
        );
      })}
    </div>
  );
};

export default Hand;
