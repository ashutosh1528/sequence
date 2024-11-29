export type BoardCellType = {
  id: string;
  face: string;
  teamId: string;
  isHighlighted: boolean;
  partOfSequence: number;
  sequenceIds: string[];
};
