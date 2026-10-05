import { inject, Injectable } from '@angular/core';
import { BOARD_SIZE } from '@entities/board';
import { Position } from '@entities/position';
import { Ship, ShipConfig, ShipService } from '@entities/ship';

@Injectable({
  providedIn: 'root',
})
export class PlaceShipService {
  private readonly _shipService = inject(ShipService);
  private readonly _boardSize: number = inject(BOARD_SIZE);

  public canPlaceShip(config: ShipConfig, ships: Ship[]): boolean {
    const shipCells = this._shipService.getShipCells(config);

    if (
      shipCells.some(
        ({ row, column }) =>
          row < 0 ||
          row >= this._boardSize ||
          column < 0 ||
          column >= this._boardSize,
      )
    ) {
      return false;
    }

    return ships.every((existingShip) => {
      const existingCells = this._shipService.getShipCells(existingShip);

      return shipCells.every((shipCell: Position) =>
        existingCells.every(
          (existingCell) =>
            Math.abs(shipCell.row - existingCell.row) > 1 ||
            Math.abs(shipCell.column - existingCell.column) > 1,
        ),
      );
    });
  }
}
