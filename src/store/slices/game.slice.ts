import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GameSliceState {
  isLocked: boolean;
}

const initialState = {
  isLocked: false,
};
export const GameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setIsLocked: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action?.payload;
    },
  },
});

export const { setIsLocked } = GameSlice.actions;
export default GameSlice.reducer;
