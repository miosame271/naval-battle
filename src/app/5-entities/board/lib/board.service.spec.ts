import { TestBed } from '@angular/core/testing';
import { Field, FieldService } from '@entities/field';
import { Board } from '../model';
import { BoardService } from './board.service';
import { BOARD_SIZE } from './board-size.token';
import { Position } from '@entities/position';

describe('BoardService', () => {
  let service: BoardService;
  let fieldService: jasmine.SpyObj<FieldService>;

  const createField = (row: number, column: number): Field => ({
    position: { row, column },
    hasShip: false,
    isHit: false,
  });

  const board: Board = {
    fields: [createField(0, 0), createField(0, 1), createField(1, 0)],
    ships: [],
  };

  beforeEach(() => {
    fieldService = jasmine.createSpyObj<FieldService>('FieldService', [
      'createField',
      'setShip',
      'hit',
    ]);
    fieldService.createField.and.callFake(createField);
    fieldService.setShip.and.callFake((field: Field, hasShip: boolean) => ({
      ...field,
      hasShip,
    }));
    fieldService.hit.and.callFake((field: Field) => ({
      ...field,
      isHit: true,
    }));

    TestBed.configureTestingModule({
      providers: [
        BoardService,
        { provide: FieldService, useValue: fieldService },
        { provide: BOARD_SIZE, useValue: 2 },
      ],
    });

    service = TestBed.inject(BoardService);
  });

  it('creates the service', () => {
    expect(service).toBeTruthy();
  });

  describe('createBoard', () => {
    it('creates a board with the configured number of fields', () => {
      expect(service.createBoard().fields).toEqual([
        createField(0, 0),
        createField(0, 1),
        createField(1, 0),
        createField(1, 1),
      ]);
    });

    it('creates each field through FieldService', () => {
      service.createBoard();

      expect(fieldService.createField).toHaveBeenCalledTimes(4);
    });
  });

  describe('getField', () => {
    it('returns the field at the requested position', () => {
      const position: Position = { row: 0, column: 1 };

      expect(service.getField(board, position)).toEqual(createField(0, 1));
    });

    it('returns undefined when the position is not on the board', () => {
      const position: Position = { row: 9, column: 9 };

      expect(service.getField(board, position)).toBeUndefined();
    });
  });

  describe('updateField', () => {
    it('replaces a field at the same position', () => {
      const updatedField: Field = {
        ...createField(0, 1),
        hasShip: true,
      };

      expect(service.updateField(board, updatedField).fields[1]).toEqual(
        updatedField,
      );
    });

    it('keeps all fields unchanged when the position does not exist', () => {
      const missingField: Field = {
        ...createField(9, 9),
        hasShip: true,
      };

      expect(service.updateField(board, missingField)).toEqual(board);
    });
  });

  describe('hitField', () => {
    it('marks the field at the requested position as hit', () => {
      const position: Position = { row: 1, column: 0 };

      expect(service.hitField(board, position).fields[2].isHit).toBeTrue();
    });

    it('returns the original board when the position does not exist', () => {
      const position: Position = { row: 9, column: 9 };

      expect(service.hitField(board, position)).toBe(board);
    });
  });

  // TODO покрыть тестами оставшиеся методы
});
