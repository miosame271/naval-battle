import { inject, Injectable } from '@angular/core';
import { Ship, ShipDirection, ShipService, ShipSize } from '@entities/ship';
import { RandomShipService } from '@features/random-ship';

@Injectable({
  providedIn: 'root',
})
export class CreateShipsService {
  private readonly _shipService = inject(ShipService);
  private readonly _randomService = inject(RandomShipService);

  public createRandomShips(): Ship[] {
    const initialShips = this._createInitialShips();
    return this._randomService.randomizeShipsCollection(initialShips);
  }

  private _createInitialShips(): Ship[] {
    return [
      this._shipService.createShip({
        size: ShipSize.Large,
        direction: ShipDirection.Horizontal,
        startPosition: { row: 0, column: 0 },
      }),
      this._shipService.createShip({
        size: ShipSize.Big,
        direction: ShipDirection.Horizontal,
        startPosition: { row: 2, column: 0 },
      }),
      this._shipService.createShip({
        size: ShipSize.Big,
        direction: ShipDirection.Horizontal,
        startPosition: { row: 2, column: 4 },
      }),
      this._shipService.createShip({
        size: ShipSize.Medium,
        direction: ShipDirection.Horizontal,
        startPosition: { row: 5, column: 0 },
      }),
      this._shipService.createShip({
        size: ShipSize.Medium,
        direction: ShipDirection.Horizontal,
        startPosition: { row: 5, column: 3 },
      }),
      this._shipService.createShip({
        size: ShipSize.Medium,
        direction: ShipDirection.Horizontal,
        startPosition: { row: 5, column: 6 },
      }),
      this._shipService.createShip({
        size: ShipSize.Small,
        direction: ShipDirection.Horizontal,
        startPosition: { row: 8, column: 0 },
      }),
      this._shipService.createShip({
        size: ShipSize.Small,
        direction: ShipDirection.Horizontal,
        startPosition: { row: 8, column: 2 },
      }),
      this._shipService.createShip({
        size: ShipSize.Small,
        direction: ShipDirection.Horizontal,
        startPosition: { row: 8, column: 4 },
      }),
      this._shipService.createShip({
        size: ShipSize.Small,
        direction: ShipDirection.Horizontal,
        startPosition: { row: 8, column: 6 },
      }),
    ];
  }
}
