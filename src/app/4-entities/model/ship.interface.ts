import { Orientations } from './orientation.enum';
import { Position } from './position.interface';

export interface Ship {
  start: Position;
  orientation: Orientations;
  size: number;
  hit: Position[];
}
