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

export interface ShipPosition {
  row: number;
  column: number;
}

export interface ShipConfig {
  size: ShipSize;
  direction: ShipDirection;
  startPosition: ShipPosition;
}

export interface Ship {
  id: string;
  size: ShipSize;
  direction: ShipDirection;
  startPosition: ShipPosition;
  status: ShipStatus;
  hitPositions: ShipPosition[];
}
