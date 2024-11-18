import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetInitalDetails } from "../types/userSlice.types";
import { toTitleCase } from "../../utils/toProperCase";

export interface UserState {
  gameId: string;
  playerId: string;
  name: string;
  isAdmin: boolean;
  isReady: boolean;
}

const initialState: UserState = {
  gameId: "",
  playerId: "",
  name: "",
  isAdmin: false,
  isReady: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInitalUserDetails: (state, action: PayloadAction<GetInitalDetails>) => {
      state.gameId = action?.payload?.gameId || "";
      state.playerId = action?.payload?.playerId || "";
      state.name = toTitleCase(action?.payload?.name || "");
      state.isAdmin = action?.payload?.isAdmin || false;
      state.isReady = action?.payload?.isReady || false;
    },
    setPlayerReadyStatus: (state, action: PayloadAction<boolean>) => {
      state.isReady = action?.payload;
    },
  },
});

export const { setInitalUserDetails, setPlayerReadyStatus } = userSlice.actions;

export default userSlice.reducer;
