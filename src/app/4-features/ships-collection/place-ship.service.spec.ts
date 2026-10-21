/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import { BOARD_SIZE } from '@entities/board';
import {
  ShipDirection,
  ShipService,
  ShipSize,
  ShipConfig,
} from '@entities/ship';
import { PlaceShipService } from './place-ship.service';

describe('PlaceShipService', () => {
  let service: PlaceShipService;
  let shipService: ShipService;

  const createConfig = (
    row: number,
    column: number,
    size: ShipSize = ShipSize.Medium,
    direction: ShipDirection = ShipDirection.Horizontal,
  ): ShipConfig => ({
    size,
    direction,
    startPosition: { row, column },
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: BOARD_SIZE, useValue: 10 }],
    });

    service = TestBed.inject(PlaceShipService);
    shipService = TestBed.inject(ShipService);
  });

  it('creates the service', () => {
    expect(service).toBeTruthy();
  });

  describe('canPlaceShip', () => {
    it('allows a valid ship on an empty board', () => {
      expect(service.canPlaceShip(createConfig(2, 2), [])).toBeTrue();
    });

    it('allows a ship when it is separated from an existing ship', () => {
      const existingShip = shipService.createShip(
        createConfig(2, 2, ShipSize.Small),
      );

      expect(
        service.canPlaceShip(createConfig(2, 4), [existingShip]),
      ).toBeTrue();
    });

    it('rejects a ship that extends beyond the right edge of the board', () => {
      expect(service.canPlaceShip(createConfig(0, 9), [])).toBeFalse();
    });

    it('rejects a ship that extends beyond the bottom edge of the board', () => {
      expect(
        service.canPlaceShip(
          createConfig(9, 0, ShipSize.Medium, ShipDirection.Vertical),
          [],
        ),
      ).toBeFalse();
    });

    it('rejects a ship whose starting row is negative', () => {
      expect(service.canPlaceShip(createConfig(-1, 0), [])).toBeFalse();
    });

    it('rejects a ship whose starting column is negative', () => {
      expect(service.canPlaceShip(createConfig(0, -1), [])).toBeFalse();
    });

    it('rejects a ship that overlaps an existing ship', () => {
      const existingShip = shipService.createShip(
        createConfig(2, 2, ShipSize.Small),
      );

      expect(
        service.canPlaceShip(createConfig(2, 2), [existingShip]),
      ).toBeFalse();
    });

    it('rejects a ship adjacent horizontally to an existing ship', () => {
      const existingShip = shipService.createShip(
        createConfig(2, 2, ShipSize.Small),
      );

      expect(
        service.canPlaceShip(createConfig(2, 3), [existingShip]),
      ).toBeFalse();
    });

    it('rejects a ship adjacent vertically to an existing ship', () => {
      const existingShip = shipService.createShip(
        createConfig(2, 2, ShipSize.Small),
      );

      expect(
        service.canPlaceShip(createConfig(3, 2), [existingShip]),
      ).toBeFalse();
    });

    it('rejects a ship adjacent diagonally to an existing ship', () => {
      const existingShip = shipService.createShip(
        createConfig(2, 2, ShipSize.Small),
      );

      expect(
        service.canPlaceShip(createConfig(3, 3), [existingShip]),
      ).toBeFalse();
    });
  });
});
