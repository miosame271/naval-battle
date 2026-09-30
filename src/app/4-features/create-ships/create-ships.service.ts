import { Injectable } from '@angular/core';
import {
  Ship,
  ShipDirection,
  ShipSize,
  ShipConfig,
  ShipStatus,
} from '@entities/ship';

@Injectable({
  providedIn: 'root',
})
export class CreateShipsService {
  constructor() {}

  public createShips(): Ship[] {
    const largeShip = this._createShip({
      direction: ShipDirection.Horizontal,
      size: Number(ShipSize.Large),
      startPosition: {
        row: 2,
        column: 2,
      },
    });
    const [bigShip1, bigShip2] = Array.from({ length: 2 }, (_, i) =>
      this._createShip({
        direction: ShipDirection.Horizontal,
        size: Number(ShipSize.Big),
        startPosition: {
          row: 4,
          column: 2 + i * 3,
        },
      }),
    );
    const [mediumShip1, mediumShip2, mediumShip3] = Array.from(
      { length: 3 },
      (_, i) =>
        this._createShip({
          direction: ShipDirection.Horizontal,
          size: Number(ShipSize.Medium),
          startPosition: {
            row: 6,
            column: 2 + i * 2,
          },
        }),
    );
    const [smallShip1, smallShip2, smallShip3, smallShip4] = Array.from(
      { length: 4 },
      (_, i) =>
        this._createShip({
          direction: ShipDirection.Horizontal,
          size: Number(ShipSize.Small),
          startPosition: {
            row: 6,
            column: i + 2,
          },
        }),
    );
    return [
      largeShip,
      bigShip1,
      bigShip2,
      mediumShip1,
      mediumShip2,
      mediumShip3,
      smallShip1,
      smallShip2,
      smallShip3,
      smallShip4,
    ];
  }

  private _createShip(config: ShipConfig): Ship {
    return {
      id: crypto.randomUUID(),
      startPosition: config.startPosition,
      direction: config.direction,
      size: config.size,
      status: ShipStatus.Intact,
      hitPositions: [],
    };
  }
}
