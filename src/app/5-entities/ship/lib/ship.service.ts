import { Injectable } from '@angular/core';
import {
  Ship,
  ShipDirection,
  ShipConfig,
  ShipStatus,
  ShipPosition,
} from '../model';

@Injectable({
  providedIn: 'root',
})
export class ShipService {
  public createShip(config: ShipConfig): Ship {
    return {
      id: crypto.randomUUID(),
      startPosition: config.startPosition,
      direction: config.direction,
      size: config.size,
      status: ShipStatus.Intact,
      hitPositions: [],
    };
  }

  public getShipCells(shipConfig: ShipConfig): ShipPosition[] {
    return Array.from({ length: shipConfig.size }, (_, index) => ({
      row:
        shipConfig.startPosition.row +
        (shipConfig.direction === ShipDirection.Vertical ? index : 0),
      column:
        shipConfig.startPosition.column +
        (shipConfig.direction === ShipDirection.Horizontal ? index : 0),
    }));
  }

  public isPositionHit(ship: Ship, position: ShipPosition): boolean {
    return ship.hitPositions.some(
      (hitPosition) =>
        hitPosition.row === position.row &&
        hitPosition.column === position.column,
    );
  }

  public updateStatus(ship: Ship): Ship {
    const changedShip = { ...ship };
    if (ship.hitPositions.length === 0) {
      changedShip.status = ShipStatus.Intact;
    } else if (
      ship.hitPositions.length > 0 &&
      ship.hitPositions.length < ship.size
    ) {
      changedShip.status = ShipStatus.Damaged;
    } else if (ship.hitPositions.length === ship.size) {
      changedShip.status = ShipStatus.Destroyed;
    }
    return changedShip;
  }

  public rotate(ship: Ship): Ship {
    const changedShip = { ...ship };
    changedShip.direction =
      ship.direction === ShipDirection.Horizontal
        ? ShipDirection.Vertical
        : ShipDirection.Horizontal;
    return changedShip;
  }

  public fire(position: ShipPosition): void {
    // TODO: Implement fire logic
  }

  public hit(ship: Ship, position: ShipPosition): Ship {
    const changedShip = { ...ship };
    if (!this.isPositionHit(changedShip, position)) {
      changedShip.hitPositions.push(position);
    }
    return this.updateStatus(changedShip);
  }
}
