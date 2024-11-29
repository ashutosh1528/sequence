import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  AddPlayer,
  PlayersList,
  SetOnlineStatus,
  SetReadyStatus,
} from "../types/playersSlice.types";
import { toTitleCase } from "../../utils/toProperCase";
import { SetTeamsType } from "../types/teamSlice.types";

export interface PlayersState {
  players: {
    [playerId: string]: {
      id: string;
      name: string;
      isOnline: boolean;
      teamId: string;
      isAdmin: boolean;
      isReady: boolean;
    };
  };
  playerList: string[];
}

const initialState: PlayersState = {
  players: {},
  playerList: [],
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setInitalPlayerList: (state, action: PayloadAction<PlayersList>) => {
      Object.values(action.payload).forEach((player) => {
        if (!state.players[player.id]) {
          state.players[player.id] = {
            id: player.id,
            isAdmin: player.isAdmin,
            isOnline: player.isOnline,
            name: toTitleCase(player.name),
            teamId: player?.teamId || "",
            isReady: player?.isReady || false,
          };
        }
        if (!state.playerList.includes(player.id)) {
          state.playerList.push(player.id);
        }
      });
    },
    addPlayer: (state, action: PayloadAction<AddPlayer>) => {
      const playerId = action.payload.id;
      if (!state.players?.[playerId]) {
        state.players[playerId] = {
          id: playerId,
          isAdmin: action.payload.isAdmin,
          isOnline: action.payload.isOnline,
          name: toTitleCase(action.payload.name),
          teamId: action.payload.teamId || "",
          isReady: action.payload.isReady || false,
        };
        if (!state.playerList.includes(playerId)) {
          state.playerList.push(playerId);
        }
      }
    },
    setReadyStatus: (state, action: PayloadAction<SetReadyStatus>) => {
      const player = state.players[action?.payload?.playerId || ""];
      if (Object.keys(player).length) {
        player.isReady = action?.payload?.status || false;
      }
    },
    setOnlineStatus: (state, action: PayloadAction<SetOnlineStatus>) => {
      const player = state.players[action?.payload?.playerId || ""];
      if (Object.keys(player).length) {
        player.isOnline = action?.payload?.status || false;
      }
    },
    setTeamIds: (state, action: PayloadAction<SetTeamsType>) => {
      Object.values(action?.payload).forEach((team) => {
        team.players.forEach((playerId) => {
          state.players[playerId].teamId = team.id;
        });
      });
    },
    clearTeamIds: (state) => {
      Object.values(state.players).forEach((player) => {
        state.players[player.id].teamId = "";
      });
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      const playerIdToRemove = action?.payload;
      if (state.players[playerIdToRemove]) {
        delete state.players[playerIdToRemove];
      }
      const index = state.playerList.indexOf(playerIdToRemove);
      if (index > -1) {
        state.playerList.splice(index, 1);
      }
    },
    clearPlayerStore: (state) => {
      state = { ...initialState };
    },
  },
});

export const {
  addPlayer,
  setInitalPlayerList,
  setReadyStatus,
  setOnlineStatus,
  removePlayer,
  clearPlayerStore,
  setTeamIds,
  clearTeamIds,
} = playersSlice.actions;

export default playersSlice.reducer;
