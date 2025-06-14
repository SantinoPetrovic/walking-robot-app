import type { Direction } from "../types/robotTypes";

export const leftTurnMap: Record<Direction, Direction> = {
  N: 'W',
  W: 'S',
  S: 'E',
  E: 'N',
};

export const rightTurnMap: Record<Direction, Direction> = {
  N: 'E',
  E: 'S',
  S: 'W',
  W: 'N',
};