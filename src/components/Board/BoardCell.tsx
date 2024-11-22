import { useMemo, useState } from "react";
import CardIcon from "../CardIcon";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const BoardCell = ({ cellId }: { cellId: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [x, y] = useMemo(() => {
    const [x, y] = cellId.split(".");
    return [parseInt(x, 10), parseInt(y, 10)];
  }, [cellId]);

  const boardCell = useSelector((state: RootState) => state.game.board[x][y]);

  const handleCellClick = () => {
    console.log(cellId);
    console.log(x, y);
  };

  const onMouseEnter = () => {
    if (boardCell.isHighlighted && !boardCell.teamId) {
      setIsHovered(true);
    }
  };

  const onMouseLeave = () => {
    if (isHovered) setIsHovered(false);
  };
  return (
    <div
      onClick={handleCellClick}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      className={`board__container__cell${isHovered ? "--hover" : ""}`}
      style={{
        border: `${
          boardCell.isHighlighted && !boardCell.teamId
            ? "2px solid #3efb01"
            : "4px solid white"
        }`,
      }}
    >
      <CardIcon name={boardCell.face} width={50} />
    </div>
  );
};

export default BoardCell;
