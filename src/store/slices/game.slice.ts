import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cell } from "../../services/useGetBoard";

export interface GameSliceState {
  isLocked: boolean;
  isStarted: boolean;
  board: Cell[][] | [];
}

const initialState: GameSliceState = {
  isLocked: false,
  isStarted: false,
  board: [],
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
    setBoard: (state, action: PayloadAction<Cell[][]>) => {
      state.board = action?.payload;
    },
    clearGame: (state) => {
      state.isLocked = false;
    },
  },
});

export const { setIsLocked, clearGame, setIsStarted, setBoard } =
  GameSlice.actions;
export default GameSlice.reducer;
