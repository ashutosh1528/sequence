import BoardCell from "./BoardCell";
import BOARD_ID from "../../constants/BOARD_ID";
import "./index.scss";

const Board = () => {
  return (
    <div className="board__container">
      {BOARD_ID.flat().map((cell) => (
        <BoardCell key={cell.id} name={cell.face} />
      ))}
    </div>
  );
};

export default Board;
