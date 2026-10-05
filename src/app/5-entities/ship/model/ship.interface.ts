import { Position } from '@entities/position';

export const ShipDirection = {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
} as const;
export type ShipDirection = (typeof ShipDirection)[keyof typeof ShipDirection];

export const ShipStatus = {
  Intact: 'intact',
  Damaged: 'damaged',
  Destroyed: 'destroyed',
} as const;
export type ShipStatus = (typeof ShipStatus)[keyof typeof ShipStatus];

export const ShipSize = {
  Large: 4,
  Big: 3,
  Medium: 2,
  Small: 1,
} as const;
export type ShipSize = (typeof ShipSize)[keyof typeof ShipSize];

export interface ShipConfig {
  size: ShipSize;
  direction: ShipDirection;
  startPosition: Position;
}

export interface Ship {
  id: string;
  size: ShipSize;
  status: ShipStatus;
  direction: ShipDirection;
  startPosition: Position;
  hitPositions: Position[];
}
