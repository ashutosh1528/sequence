import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BoardCell from "./BoardCell";
import useGetBoard from "../../services/useGetBoard";
import { setBoard } from "../../store/slices/game.slice";
import { BoardCellType } from "../../types/BoardCell.type";
import "./index.scss";

const Board = () => {
  const dispatch = useDispatch();
  const [staticBoard, setStaticBoard] = useState<BoardCellType[][]>([]);
  const { data, isSuccess } = useGetBoard();

  useEffect(() => {
    if (data && staticBoard.length === 0 && isSuccess) {
      setStaticBoard(data.board);
      dispatch(setBoard(data.board));
    }
  }, [data, isSuccess]);

  if (staticBoard.length === 0) return <div>Loading ...</div>;

  return (
    <div className="board__container">
      {staticBoard.flat().map((cell) => (
        <BoardCell cellId={cell.id} key={cell.id} />
      ))}
    </div>
  );
};

export default Board;
