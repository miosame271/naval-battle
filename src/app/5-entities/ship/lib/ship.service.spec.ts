import { TestBed } from '@angular/core/testing';
import { Position } from '@entities/position';
import {
  ShipDirection,
  ShipSize,
  ShipStatus,
  ShipConfig,
  Ship,
} from '../model';
import { ShipService } from './ship.service';

describe('ShipService', () => {
  let service: ShipService;

  const config: ShipConfig = {
    size: ShipSize.Medium,
    direction: ShipDirection.Horizontal,
    startPosition: { row: 2, column: 3 },
  };

  const createShip = (overrides: Partial<Ship> = {}): Ship => ({
    id: '00000000-0000-4000-8000-000000000001',
    size: ShipSize.Medium,
    direction: ShipDirection.Horizontal,
    startPosition: { row: 2, column: 3 },
    status: ShipStatus.Intact,
    hitPositions: [],
    ...overrides,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ShipService] });
    service = TestBed.inject(ShipService);
  });

  it('creates the service', () => {
    expect(service).toBeTruthy();
  });

  describe('createShip', () => {
    it('creates a ship with the supplied configuration and intact status', () => {
      spyOn(crypto, 'randomUUID').and.returnValue(
        '00000000-0000-4000-8000-000000000001',
      );

      expect(service.createShip(config)).toEqual({
        id: '00000000-0000-4000-8000-000000000001',
        startPosition: config.startPosition,
        direction: config.direction,
        size: config.size,
        status: ShipStatus.Intact,
        hitPositions: [],
      });
    });

    it('generates a unique id for each created ship', () => {
      spyOn(crypto, 'randomUUID').and.returnValues(
        '00000000-0000-4000-8000-000000000001',
        '00000000-0000-4000-8000-000000000002',
      );
      const firstShip = service.createShip(config);
      const secondShip = service.createShip(config);

      expect(firstShip.id).not.toBe(secondShip.id);
    });
  });

  describe('getShipCells', () => {
    it('returns consecutive cells for a horizontal ship', () => {
      expect(service.getShipCells(config)).toEqual([
        { row: 2, column: 3 },
        { row: 2, column: 4 },
      ]);
    });

    it('returns consecutive cells for a vertical ship', () => {
      expect(
        service.getShipCells({
          ...config,
          direction: ShipDirection.Vertical,
        }),
      ).toEqual([
        { row: 2, column: 3 },
        { row: 3, column: 3 },
      ]);
    });
  });

  describe('isPositionHit', () => {
    it('returns true when the position has already been hit', () => {
      const position: Position = { row: 2, column: 3 };
      const ship = createShip({ hitPositions: [position] });

      expect(service.isPositionHit(ship, position)).toBeTrue();
    });

    it('returns false when the position has not been hit', () => {
      const ship = createShip({ hitPositions: [{ row: 2, column: 3 }] });

      expect(service.isPositionHit(ship, { row: 4, column: 5 })).toBeFalse();
    });
  });

  describe('updateStatus', () => {
    it('sets intact status when there are no hit positions', () => {
      const ship = createShip({
        status: ShipStatus.Destroyed,
        hitPositions: [],
      });

      expect(service.updateStatus(ship).status).toBe(ShipStatus.Intact);
    });

    it('sets damaged status when some but not all cells are hit', () => {
      const ship = createShip({ hitPositions: [{ row: 2, column: 3 }] });

      expect(service.updateStatus(ship).status).toBe(ShipStatus.Damaged);
    });

    it('sets destroyed status when all cells are hit', () => {
      const ship = createShip({
        hitPositions: [
          { row: 2, column: 3 },
          { row: 2, column: 4 },
        ],
      });

      expect(service.updateStatus(ship).status).toBe(ShipStatus.Destroyed);
    });
  });

  describe('rotate', () => {
    it('rotates a horizontal ship to vertical', () => {
      expect(service.rotate(createShip()).direction).toBe(
        ShipDirection.Vertical,
      );
    });

    it('rotates a vertical ship to horizontal', () => {
      expect(
        service.rotate(createShip({ direction: ShipDirection.Vertical }))
          .direction,
      ).toBe(ShipDirection.Horizontal);
    });
  });

  describe('hit', () => {
    it('adds a new hit position and updates ship status', () => {
      const ship = createShip();

      expect(service.hit(ship, { row: 2, column: 3 })).toEqual({
        ...ship,
        hitPositions: [{ row: 2, column: 3 }],
        status: ShipStatus.Damaged,
      });
    });

    it('does not add a duplicate hit position', () => {
      const position: Position = { row: 2, column: 3 };
      const ship = createShip({ hitPositions: [position] });

      expect(service.hit(ship, position).hitPositions).toEqual([position]);
    });

    it('does not mutate the original ship when registering a hit', () => {
      const ship = createShip();
      service.hit(ship, { row: 2, column: 3 });

      expect(ship.hitPositions).toEqual([]);
    });
  });
});
