export type AddPlayer = {
  id: string;
  name: string;
  isOnline: boolean;
  isAdmin: boolean;
  isReady: boolean;
  teamId?: string;
};

export type PlayersList = Record<string, AddPlayer>;

export type SetReadyStatus = {
  playerId: string;
  status: boolean;
};

export type SetOnlineStatus = {
  playerId: string;
  status: boolean;
};
