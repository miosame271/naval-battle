import { Injectable } from '@angular/core';
import {
  Ship,
  ShipDirection,
  ShipSize,
  ShipConfig,
  ShipStatus,
  ShipPosition,
} from '@entities/ship';

@Injectable({
  providedIn: 'root',
})
export class ShipService {
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

  public isPositionHit(ship: Ship, position: ShipPosition): boolean {
    return ship.hitPositions.some(
      (hitPosition) =>
        hitPosition.row === position.row &&
        hitPosition.column === position.column,
    );
  }

  public updateStatus(ship: Ship): Ship {
    if (ship.hitPositions.length === 0) {
      ship.status = ShipStatus.Intact;
    } else if (
      ship.hitPositions.length > 0 &&
      ship.hitPositions.length < ship.size
    ) {
      ship.status = ShipStatus.Damaged;
    } else if (ship.hitPositions.length === ship.size) {
      ship.status = ShipStatus.Destroyed;
    }
    return ship;
  }

  public rotate(ship: Ship): Ship {
    ship.direction =
      ship.direction === ShipDirection.Horizontal
        ? ShipDirection.Vertical
        : ShipDirection.Horizontal;
    return ship;
  }

  public fire(position: ShipPosition): void {
    // TODO: Implement fire logic
  }

  public hit(ship: Ship, position: ShipPosition): Ship {
    if (!this.isPositionHit(ship, position)) {
      ship.hitPositions.push(position);
    }
    return this.updateStatus(ship);
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
