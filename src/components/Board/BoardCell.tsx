import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import CardIcon from "../CardIcon";
import { RootState } from "../../store";
import { setIsCoinPlacedInTurn } from "../../store/slices/game.slice";
import usePlayerMove from "../../services/usePlayerMove";
import RedCoin from "../../assets/coins/redCoin.svg";
import BlueCoin from "../../assets/coins/blueCoin.svg";
import GreenCoin from "../../assets/coins/greenCoin.svg";
import { COLORS } from "../../store/types/teamSlice.types";

const BoardCell = ({ cellId }: { cellId: string }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const playerMove = usePlayerMove();

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
  const isCoinPlacedInTurn = useSelector(
    (state: RootState) => state.game.isCoinPlacedInTurn
  );

  const [wildCardInfo, setWildCardInfo] = useState<
    "" | "PLAY_WILDCARD" | "REMOVE_WILDCARD"
  >("");

  const getWildCardInfo = () => {
    if (!cardToPlay.includes("J")) return "";
    const TWO_EYED_JACKS_SUITS = ["D", "C"];
    const cardFaceSuit = cardToPlay?.[1] || "";
    if (!cardFaceSuit) return "";
    if (TWO_EYED_JACKS_SUITS.includes(cardFaceSuit)) return "PLAY_WILDCARD";
    return "REMOVE_WILDCARD";
  };

  useEffect(() => {
    setWildCardInfo(getWildCardInfo());
  }, [cardToPlay]);

  const handleCellClick = () => {
    const canPlay =
      ((boardCell.isHighlighted || wildCardInfo === "PLAY_WILDCARD") &&
        !boardCell.teamId &&
        !isCoinPlacedInTurn) ||
      (wildCardInfo === "REMOVE_WILDCARD" &&
        boardCell.teamId &&
        !isCoinPlacedInTurn);
    if (canPlay) {
      playerMove(
        { cardFace: cardToPlay, cellId },
        {
          onSuccess: (res) => {
            if (res.data.isSuccess) {
              queryClient.invalidateQueries({
                queryKey: ["getCards"],
                exact: false,
              });
              dispatch(setIsCoinPlacedInTurn(true));
            }
          },
        }
      );
    }
  };

  const onMouseEnter = () => {
    if (wildCardInfo === "PLAY_WILDCARD") {
      setIsHovered(true);
    } else if (wildCardInfo === "REMOVE_WILDCARD" && boardCell.teamId) {
      setIsHovered(true);
    } else if (boardCell.isHighlighted && !boardCell.teamId) {
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
