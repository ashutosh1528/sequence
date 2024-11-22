import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import CardIcon from "../CardIcon";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import usePlayerMove from "../../services/usePlayerMove";
import RedCoin from "../../assets/coins/redCoin.svg";
import BlueCoin from "../../assets/coins/blueCoin.svg";
import GreenCoin from "../../assets/coins/greenCoin.svg";
import { COLORS } from "../../store/types/teamSlice.types";

const BoardCell = ({ cellId }: { cellId: string }) => {
  const playerMove = usePlayerMove();
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState(false);
  const [x, y] = useMemo(() => {
    const [x, y] = cellId.split(".");
    return [parseInt(x, 10), parseInt(y, 10)];
  }, [cellId]);

  const boardCell = useSelector((state: RootState) => state.game.board[x][y]);
  const cardToPlay = useSelector((state: RootState) => state.user.cardToPlay);
  const teamColorMapper = useSelector(
    (state: RootState) => state.teams.teamColorMapper
  );

  const handleCellClick = () => {
    if (boardCell.isHighlighted && !boardCell.teamId) {
      playerMove(
        { cardFace: cardToPlay, cellId },
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
    }
  };

  const onMouseEnter = () => {
    if (boardCell.isHighlighted && !boardCell.teamId) {
      setIsHovered(true);
    }
  };

  const onMouseLeave = () => {
    if (isHovered) setIsHovered(false);
  };

  const getCoin = () => {
    const color = teamColorMapper[boardCell.teamId];
    if (color === COLORS.BLUE) return BlueCoin;
    if (color === COLORS.RED) return RedCoin;
    if (color === COLORS.GREEN) return GreenCoin;
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
      {boardCell.teamId && (
        <div className="board__container__coin">
          <img src={getCoin()} width={40} />
        </div>
      )}
      <CardIcon name={boardCell.face} width={50} />
    </div>
  );
};

export default BoardCell;
