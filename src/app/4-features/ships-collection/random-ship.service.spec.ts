import { TestBed } from '@angular/core/testing';
import { BOARD_SIZE } from '@entities/board';
import {
  Ship,
  ShipConfig,
  ShipDirection,
  ShipService,
  ShipSize,
  ShipStatus,
} from '@entities/ship';
import { UtilsService } from '@shared/lib';
import { PlaceShipService } from './place-ship.service';
import { RandomShipService } from './random-ship.service';

describe('RandomShipService', () => {
  let service: RandomShipService;
  let shipService: jasmine.SpyObj<ShipService>;
  let placeShipService: jasmine.SpyObj<PlaceShipService>;
  let utilsService: jasmine.SpyObj<UtilsService>;

  const config: ShipConfig = {
    size: ShipSize.Medium,
    direction: ShipDirection.Horizontal,
    startPosition: { row: 2, column: 3 },
  };

  const createShip = (shipConfig: ShipConfig): Ship => ({
    id: 'ship-1',
    ...shipConfig,
    status: ShipStatus.Intact,
    hitPositions: [],
  });

  beforeEach(() => {
    shipService = jasmine.createSpyObj<ShipService>('ShipService', [
      'createShip',
    ]);
    placeShipService = jasmine.createSpyObj<PlaceShipService>(
      'PlaceShipService',
      ['canPlaceShip'],
    );
    utilsService = jasmine.createSpyObj<UtilsService>('UtilsService', [
      'getRandomInteger',
    ]);

    shipService.createShip.and.callFake((shipConfig: ShipConfig) =>
      createShip(shipConfig),
    );
    placeShipService.canPlaceShip.and.returnValue(true);
    utilsService.getRandomInteger.and.returnValue(0);

    TestBed.configureTestingModule({
      providers: [
        RandomShipService,
        { provide: ShipService, useValue: shipService },
        { provide: PlaceShipService, useValue: placeShipService },
        { provide: UtilsService, useValue: utilsService },
        { provide: BOARD_SIZE, useValue: 10 },
      ],
    });

    service = TestBed.inject(RandomShipService);
  });

  it('creates the service', () => {
    expect(service).toBeTruthy();
  });

  describe('createRandomShip', () => {
    it('creates a ship using the generated configuration', () => {
      spyOn(service, 'createRandomShipConfig').and.returnValue(config);

      expect(service.createRandomShip({ size: ShipSize.Medium })).toEqual(
        createShip(config),
      );
    });

    it('propagates an error when ShipService cannot create the ship', () => {
      spyOn(service, 'createRandomShipConfig').and.returnValue(config);
      shipService.createShip.and.throwError('Unable to create ship');

      expect(() =>
        service.createRandomShip({ size: ShipSize.Medium }),
      ).toThrowError('Unable to create ship');
    });
  });

  describe('createRandomShipConfig', () => {
    it('preserves size, direction, and position supplied in existing parameters', () => {
      expect(service.createRandomShipConfig(config)).toEqual(config);
    });

    it('generates a configuration when no parameters are supplied', () => {
      utilsService.getRandomInteger.and.returnValues(0, 2, 3);
      spyOn(Math, 'random').and.returnValue(0.9);

      expect(service.createRandomShipConfig({})).toEqual({
        size: ShipSize.Large,
        direction: ShipDirection.Vertical,
        startPosition: { row: 2, column: 3 },
      });
    });

    it('keeps small ships horizontal', () => {
      expect(
        service.createRandomShipConfig({ size: ShipSize.Small }).direction,
      ).toBe(ShipDirection.Horizontal);
    });
  });

  describe('repositionShipsRandomly', () => {
    it('returns a repositioned ship for a valid candidate', () => {
      spyOn(service, 'createRandomShipConfig').and.returnValue(config);
      const originalShip = createShip({
        ...config,
        startPosition: { row: 0, column: 0 },
      });
      const repositionedShip = createShip(config);

      shipService.createShip.and.returnValue(repositionedShip);

      expect(service.repositionShipsRandomly([originalShip])).toEqual([
        repositionedShip,
      ]);
    });

    it('throws when no valid candidate can be found', () => {
      spyOn(service, 'createRandomShipConfig').and.returnValue(config);
      placeShipService.canPlaceShip.and.returnValue(false);
      const originalShip = createShip(config);

      expect(() =>
        service.repositionShipsRandomly([originalShip]),
      ).toThrowError(
        `Unable to reposition ship with id ${originalShip.id} after multiple attempts.`,
      );
    });

    it('returns an empty array when given an empty fleet', () => {
      expect(service.repositionShipsRandomly([])).toEqual([]);
    });
  });
});
