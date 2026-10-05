import { inject, Injectable } from '@angular/core';
import { BOARD_SIZE } from '@entities/board';
import {
  ShipSize,
  ShipDirection,
  ShipPosition,
  Ship,
  ShipConfig,
  ShipService,
} from '@entities/ship';
import { PlaceShipService } from '@features/ships-collection';
import { UtilsService } from '@shared/lib';

@Injectable({
  providedIn: 'root',
})
export class RandomShipService {
  private readonly _shipService = inject(ShipService);
  private readonly _placeShipService = inject(PlaceShipService);
  private readonly _utilsService = inject(UtilsService);
  private readonly _boardSize: number = inject(BOARD_SIZE);

  public createRandomShip(existingParams: Partial<Ship>): Ship {
    const randoms: ShipConfig = this.createRandomShipConfig(existingParams);

    return this._shipService.createShip({ ...existingParams, ...randoms });
  }

  public createRandomShipConfig(existingParams: Partial<Ship>): ShipConfig {
    const size = existingParams.size ?? this._getRandomSize();
    const direction =
      existingParams.direction ?? this._getRandomDirection(size);
    const startPosition =
      existingParams.startPosition ??
      this._getRandomStartPosition(size, direction);

    return {
      size,
      direction,
      startPosition,
    };
  }

  public repositionShipsRandomly(ships: Ship[]): Ship[] {
    return this._randomizeShips(ships);
  }

  public _randomizeShips(ships: Ship[]): Ship[] {
    const repositionedShips: Ship[] = [...ships];

    repositionedShips.forEach((ship) => {
      const candidate = this._createValidCandidateShip(ship, repositionedShips);
      repositionedShips.push(candidate);
    });

    return repositionedShips;
  }

  private _createValidCandidateShip(ship: Ship, existingShips: Ship[]): Ship {
    const candidateConfig = this.createRandomShipConfig(ship);
    const isValid = this._placeShipService.canPlaceShip(
      candidateConfig,
      existingShips.filter((s) => s.id !== ship.id),
    );

    if (!isValid) {
      return this._createValidCandidateShip(ship, existingShips);
    }

    return this._shipService.createShip(candidateConfig);
  }

  private _getRandomSize(): ShipSize {
    const sizes = Object.values(ShipSize);
    const randomIndex = this._utilsService.getRandomInteger(
      0,
      sizes.length - 1,
    );
    return sizes[randomIndex];
  }

  private _getRandomDirection(size: ShipSize): ShipDirection {
    if (size === ShipSize.Small) {
      return ShipDirection.Horizontal;
    }

    return Math.random() < 0.5
      ? ShipDirection.Horizontal
      : ShipDirection.Vertical;
  }

  private _getRandomStartPosition(
    size: ShipSize,
    direction: ShipDirection,
  ): ShipPosition {
    const maxRow =
      direction === ShipDirection.Vertical
        ? this._boardSize - size
        : this._boardSize - 1;

    const maxColumn =
      direction === ShipDirection.Horizontal
        ? this._boardSize - size
        : this._boardSize - 1;

    return {
      row: this._utilsService.getRandomInteger(0, maxRow),
      column: this._utilsService.getRandomInteger(0, maxColumn),
    };
  }
}
