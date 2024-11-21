import { useMemo } from "react";
import CardIcon from "../CardIcon";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const BoardCell = ({ cellId }: { cellId: string }) => {
  const [x, y] = useMemo(() => {
    const [x, y] = cellId.split(".");
    return [parseInt(x, 10), parseInt(y, 10)];
  }, [cellId]);

  const boardCell = useSelector((state: RootState) => state.game.board[x][y]);

  const handleCellClick = () => {
    console.log(cellId);
    console.log(x, y);
  };
  return (
    <div
      onClick={handleCellClick}
      className="board__container__cell"
      style={{
        border: `${
          boardCell.isHighlighted ? "2px solid #3efb01" : "4px solid white"
        }`,
      }}
    >
      <CardIcon name={boardCell.face} width={50} />
    </div>
  );
};

export default BoardCell;
