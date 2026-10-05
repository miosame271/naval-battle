import { Position } from '@entities/position';

export interface Field {
  position: Position;
  hasShip: boolean;
  isHit: boolean;
}
