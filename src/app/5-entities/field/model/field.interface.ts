import { ShipPosition } from '@entities/ship';

export interface Field {
  position: ShipPosition;
  hasShip: boolean;
  isHit: boolean;
}
