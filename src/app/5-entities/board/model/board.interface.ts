import { Field } from '@entities/field';
import { Ship } from '@entities/ship';

export interface Board {
  fields: Field[];
  ships: Ship[];
}

export interface GameBoardState {
  board: Board;
}
