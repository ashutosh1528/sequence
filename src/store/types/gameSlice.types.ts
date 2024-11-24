export type SetInitialGameDetailsType = {
  isLocked: boolean;
  isStarted: boolean;
  isCoinPlacedInTurn: boolean;
  isCardPickedInTurn: boolean;
  playerTurnSequence: string[];
  playerTurnIndex: number;
};
