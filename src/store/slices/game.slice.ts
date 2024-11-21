import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BoardCellType } from "../../types/BoardCell.type";

export interface GameSliceState {
  isLocked: boolean;
  isStarted: boolean;
  board: BoardCellType[][];
  faceCellIdMapper: Record<string, string[]>;
  boardCellsToHighlight: string[];
}

const initialState: GameSliceState = {
  isLocked: false,
  isStarted: false,
  board: [[]],
  faceCellIdMapper: {},
  boardCellsToHighlight: [],
};
export const GameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setIsLocked: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action?.payload || false;
    },
    setIsStarted: (state, action: PayloadAction<boolean>) => {
      state.isStarted = action?.payload || false;
    },
    setBoard: (state, action: PayloadAction<BoardCellType[][]>) => {
      state.board = action?.payload;
      action.payload.forEach((row) => {
        row.forEach((cell) => {
          if (state.faceCellIdMapper[cell.face]) {
            state.faceCellIdMapper[cell.face].push(cell.id);
          } else {
            state.faceCellIdMapper[cell.face] = [cell.id];
          }
        });
      });
    },
    setBoardCellsToHighlight: (state, action: PayloadAction<string>) => {
      state.boardCellsToHighlight = [];
      if (action?.payload) {
        const cellsForFace = state.faceCellIdMapper[action?.payload];
        cellsForFace.forEach((cell) => {
          const [x, y] = cell.split(".");
          state.board[parseInt(x, 10)][parseInt(y, 10)].isHighlighted = true;
        });
      }
    },
    setBoardCellsToUnhighlight: (state, action: PayloadAction<string>) => {
      state.boardCellsToHighlight = [];
      if (action?.payload) {
        const cellsForFace = state.faceCellIdMapper[action?.payload];
        cellsForFace.forEach((cell) => {
          const [x, y] = cell.split(".");
          state.board[parseInt(x, 10)][parseInt(y, 10)].isHighlighted = false;
        });
      }
    },
    clearGame: (state) => {
      state.isLocked = false;
    },
  },
});

export const {
  setIsLocked,
  clearGame,
  setIsStarted,
  setBoard,
  setBoardCellsToHighlight,
  setBoardCellsToUnhighlight,
} = GameSlice.actions;
export default GameSlice.reducer;
