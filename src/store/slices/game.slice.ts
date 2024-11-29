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
  playerTurnSequence: string[];
  playerTurnIndex: number;
  playerTurnId: string;
  isCardPickedInTurn: boolean;
  lastCardPlayed: string;
  isDeclaringSequence: boolean;
  potentialSequence: string[];
}

const initialState: GameSliceState = {
  isLocked: false,
  isStarted: false,
  board: [[]],
  faceCellIdMapper: {},
  boardCellsToHighlight: [],
  isCoinPlacedInTurn: false,
  playerTurnSequence: [],
  playerTurnIndex: 0,
  playerTurnId: "",
  isCardPickedInTurn: false,
  lastCardPlayed: "",
  isDeclaringSequence: false,
  potentialSequence: [],
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
      state.playerTurnIndex = action?.payload?.playerTurnIndex;
      state.playerTurnSequence = action?.payload?.playerTurnSequence;
      if (action?.payload?.playerTurnSequence.length) {
        state.playerTurnId =
          action?.payload?.playerTurnSequence[action?.payload?.playerTurnIndex];
      }
      state.isCardPickedInTurn = action?.payload?.isCardPickedInTurn;
    },
    setIsLocked: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action?.payload || false;
    },
    setIsStarted: (state, action: PayloadAction<boolean>) => {
      state.isStarted = action?.payload || false;
    },
    setPlayerTurnSequence: (state, action: PayloadAction<string[]>) => {
      state.playerTurnSequence = action?.payload;
    },
    setPlayerTurnIndex: (state, action: PayloadAction<number>) => {
      state.playerTurnIndex = action?.payload;
      if (state.playerTurnSequence.length) {
        state.playerTurnId = state.playerTurnSequence[action?.payload];
      }
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
          state.boardCellsToHighlight.push(cell);
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
          state.boardCellsToHighlight = state.boardCellsToHighlight.filter(
            (cellId) => cellId !== cell
          );
        });
      }
    },
    removeBoardCellsHighlights: (state) => {
      if (state.boardCellsToHighlight.length) {
        state.boardCellsToHighlight.forEach((cell) => {
          const [x, y] = cell.split(".");
          state.board[parseInt(x, 10)][parseInt(y, 10)].isHighlighted = false;
        });
      }
      state.boardCellsToHighlight = [];
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
      state.lastCardPlayed = cardFace;

      if (!cardFace.includes("J")) {
        const cellsForFace = state.faceCellIdMapper[cardFace];
        cellsForFace.forEach((cell) => {
          const [x, y] = cell.split(".");
          state.board[parseInt(x, 10)][parseInt(y, 10)].isHighlighted = false;
        });
      }
    },
    setIsCardPicked: (state, action: PayloadAction<boolean>) => {
      state.isCardPickedInTurn = action?.payload;
    },
    setIsDeclaringSequence: (state, action: PayloadAction<boolean>) => {
      state.isDeclaringSequence = action?.payload;
    },
    addToPotentialSequence: (state, action: PayloadAction<string>) => {
      if (action?.payload) state.potentialSequence.push(action?.payload);
    },
    removeFromPotentialSequence: (state, action: PayloadAction<string>) => {
      state.potentialSequence = state.potentialSequence.filter(
        (id) => id !== action?.payload
      );
    },
    clearPotentialSequence: (state) => {
      state.potentialSequence = [];
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
  setPlayerTurnSequence,
  setPlayerTurnIndex,
  setIsCardPicked,
  setIsDeclaringSequence,
  addToPotentialSequence,
  clearPotentialSequence,
  removeFromPotentialSequence,
  removeBoardCellsHighlights,
} = GameSlice.actions;
export default GameSlice.reducer;
