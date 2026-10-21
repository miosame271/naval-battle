import { TestBed } from '@angular/core/testing';
import { Field } from '../model';
import { FieldService } from './field.service';

describe('FieldService', () => {
  let service: FieldService;

  const createField = (
    row: number,
    column: number,
    hasShip = false,
    isHit = false,
  ): Field => ({
    position: { row, column },
    hasShip,
    isHit,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldService],
    });

    service = TestBed.inject(FieldService);
  });

  it('creates the service', () => {
    expect(service).toBeTruthy();
  });

  describe('createField', () => {
    it('creates an unoccupied and unhit field at the supplied position', () => {
      expect(service.createField(2, 4)).toEqual({
        position: { row: 2, column: 4 },
        hasShip: false,
        isHit: false,
      });
    });

    it('preserves zero coordinates', () => {
      expect(service.createField(0, 0).position).toEqual({ row: 0, column: 0 });
    });
  });

  describe('setShip', () => {
    it('marks a field as occupied when hasShip is true', () => {
      expect(service.setShip(createField(1, 2), true).hasShip).toBeTrue();
    });

    it('marks a field as unoccupied when hasShip is false', () => {
      expect(
        service.setShip(createField(1, 2, true), false).hasShip,
      ).toBeFalse();
    });

    it('preserves the other field properties', () => {
      expect(
        service.setShip(createField(1, 2, false, true), true).isHit,
      ).toBeTrue();
    });
  });

  describe('hit', () => {
    it('marks an unhit field as hit', () => {
      expect(service.hit(createField(3, 4)).isHit).toBeTrue();
    });

    it('keeps a field hit when it was already hit', () => {
      expect(service.hit(createField(3, 4, true, true)).isHit).toBeTrue();
    });

    it('preserves whether the field contains a ship', () => {
      expect(service.hit(createField(3, 4, true)).hasShip).toBeTrue();
    });
  });

  describe('isOccupied', () => {
    it('returns true for a field containing a ship', () => {
      expect(service.isOccupied(createField(0, 1, true))).toBeTrue();
    });

    it('returns false for a field without a ship', () => {
      expect(service.isOccupied(createField(0, 1))).toBeFalse();
    });
  });

  describe('isHit', () => {
    it('returns true for a hit field', () => {
      expect(service.isHit(createField(0, 1, false, true))).toBeTrue();
    });

    it('returns false for a field that has not been hit', () => {
      expect(service.isHit(createField(0, 1))).toBeFalse();
    });
  });
});
