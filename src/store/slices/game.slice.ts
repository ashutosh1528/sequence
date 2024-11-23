import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BoardCellType } from "../../types/BoardCell.type";
import { SetInitialGameDetailsType } from "../types/gameSlice.types";

export interface GameSliceState {
  isLocked: boolean;
  isStarted: boolean;
  isCoinPlacedInTurn: boolean;
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
  isCoinPlacedInTurn: false,
};
export const GameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setInitalGameDetails: (
      state,
      action: PayloadAction<SetInitialGameDetailsType>
    ) => {
      state.isCoinPlacedInTurn = action?.payload?.isCoinPlacedInTurn;
      state.isLocked = action?.payload?.isLocked;
      state.isStarted = action?.payload?.isStarted;
    },
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
      if (action?.payload && !action?.payload.includes("J")) {
        const cellsForFace = state.faceCellIdMapper[action?.payload];
        cellsForFace.forEach((cell) => {
          const [x, y] = cell.split(".");
          state.board[parseInt(x, 10)][parseInt(y, 10)].isHighlighted = true;
        });
      }
    },
    setBoardCellsToUnhighlight: (state, action: PayloadAction<string>) => {
      state.boardCellsToHighlight = [];
      if (action?.payload && !action?.payload.includes("J")) {
        const cellsForFace = state.faceCellIdMapper[action?.payload];
        cellsForFace.forEach((cell) => {
          const [x, y] = cell.split(".");
          state.board[parseInt(x, 10)][parseInt(y, 10)].isHighlighted = false;
        });
      }
    },
    setIsCoinPlacedInTurn: (state, action: PayloadAction<boolean>) => {
      state.isCoinPlacedInTurn = action?.payload;
    },
    placeCoin: (
      state,
      action: PayloadAction<{
        cellId: string;
        teamId: string;
        cardFace: string;
      }>
    ) => {
      const { cellId, teamId, cardFace } = action?.payload || {};
      const parts = cellId.split(".");
      const [x, y] = [parseInt(parts[0], 10), parseInt(parts[1], 10)];
      state.board[x][y].teamId = teamId;

      const cellsForFace = state.faceCellIdMapper[cardFace];
      cellsForFace.forEach((cell) => {
        const [x, y] = cell.split(".");
        state.board[parseInt(x, 10)][parseInt(y, 10)].isHighlighted = false;
      });
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
  placeCoin,
  setIsCoinPlacedInTurn,
  setInitalGameDetails,
} = GameSlice.actions;
export default GameSlice.reducer;
