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
  isOnline: boolean;
  cardToPlay: string;
}

const initialState: UserState = {
  gameId: "",
  playerId: "",
  name: "",
  isAdmin: false,
  isReady: false,
  isOnline: false,
  cardToPlay: "",
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
      state.isOnline = action?.payload?.isOnline || false;
      state.cardToPlay = "";
    },
    setPlayerReadyStatus: (state, action: PayloadAction<boolean>) => {
      state.isReady = action?.payload;
    },
    setCardToPlay: (state, action: PayloadAction<string>) => {
      state.cardToPlay = action?.payload || "";
    },
    clearUserStore: (state) => {
      state.gameId = "";
      state.playerId = "";
      state.name = "";
      state.isAdmin = false;
      state.isReady = false;
      state.isOnline = false;
      state.cardToPlay = "";
    },
  },
});

export const {
  setInitalUserDetails,
  setPlayerReadyStatus,
  clearUserStore,
  setCardToPlay,
} = userSlice.actions;

export default userSlice.reducer;
