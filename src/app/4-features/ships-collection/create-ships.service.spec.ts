import { TestBed } from '@angular/core/testing';
import {
  Ship,
  ShipConfig,
  ShipService,
  ShipSize,
  ShipStatus,
} from '@entities/ship';
import { RandomShipService } from './random-ship.service';
import { CreateShipsService } from './create-ships.service';

describe('CreateShipsService', () => {
  let service: CreateShipsService;
  let shipService: jasmine.SpyObj<ShipService>;
  let randomShipService: jasmine.SpyObj<RandomShipService>;

  beforeEach(() => {
    shipService = jasmine.createSpyObj<ShipService>('ShipService', [
      'createShip',
    ]);
    randomShipService = jasmine.createSpyObj<RandomShipService>(
      'RandomShipService',
      ['repositionShipsRandomly'],
    );

    shipService.createShip.and.callFake(
      (config: ShipConfig): Ship => ({
        id: `ship-${config.size}-${config.startPosition.row}-${config.startPosition.column}`,
        size: config.size,
        direction: config.direction,
        startPosition: config.startPosition,
        status: ShipStatus.Intact,
        hitPositions: [],
      }),
    );

    randomShipService.repositionShipsRandomly.and.callFake(
      (ships: Ship[]): Ship[] => ships,
    );

    TestBed.configureTestingModule({
      providers: [
        CreateShipsService,
        { provide: ShipService, useValue: shipService },
        { provide: RandomShipService, useValue: randomShipService },
      ],
    });

    service = TestBed.inject(CreateShipsService);
  });

  it('creates the service', () => {
    expect(service).toBeTruthy();
  });

  describe('createRandomShips', () => {
    it('creates ten ships', () => {
      expect(service.createRandomShips()).toHaveSize(10);
    });

    it('creates the expected fleet composition', () => {
      const ships = service.createRandomShips();

      expect(ships.map(({ size }) => size)).toEqual([
        ShipSize.Large,
        ShipSize.Big,
        ShipSize.Big,
        ShipSize.Medium,
        ShipSize.Medium,
        ShipSize.Medium,
        ShipSize.Small,
        ShipSize.Small,
        ShipSize.Small,
        ShipSize.Small,
      ]);
    });

    it('creates each ship through ShipService', () => {
      service.createRandomShips();

      expect(shipService.createShip).toHaveBeenCalledTimes(10);
    });

    it('passes the created fleet to RandomShipService', () => {
      const ships = service.createRandomShips();

      expect(
        randomShipService.repositionShipsRandomly,
      ).toHaveBeenCalledOnceWith(ships);
    });

    it('propagates an error when RandomShipService cannot reposition the fleet', () => {
      const error: Error = new Error('Unable to reposition ships');
      randomShipService.repositionShipsRandomly.and.throwError(error);

      expect(() => service.createRandomShips()).toThrowError(
        Error,
        error.message,
      );
    });
  });
});
