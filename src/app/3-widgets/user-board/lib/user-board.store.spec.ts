import { TestBed } from '@angular/core/testing';
import { BoardService } from '@entities/board';
import { ShipDirection, ShipService, ShipSize } from '@entities/ship';
import {
  CreateShipsService,
  RandomShipService,
} from '@features/ships-collection';
import { UserBoardStore } from './user-board.store';

describe('UserBoardStore', () => {
  let store: UserBoardStore;
  let boardService: BoardService;
  let shipService: ShipService;
  let createShipsService: CreateShipsService;
  let randomShipService: RandomShipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(UserBoardStore);
    boardService = TestBed.inject(BoardService);
    shipService = TestBed.inject(ShipService);
    createShipsService = TestBed.inject(CreateShipsService);
    randomShipService = TestBed.inject(RandomShipService);
  });

  it('starts with an empty board state', () => {
    expect(store.board().fields).toEqual([]);
    expect(store.board().ships).toEqual([]);
  });

  it('creates a board from generated ships and exposes fields and ships through signals', () => {
    store.createBoard();
    expect(store.fields().length).toBe(100);
    expect(store.ships().length).toBe(10);
    expect(store.fields().filter((field) => field.hasShip).length).toBe(20);
    expect(createShipsService).toBeTruthy();
  });

  it('repositions ships and rebuilds the board occupancy', () => {
    store.createBoard();
    const repositionSpy = spyOn(
      randomShipService,
      'repositionShipsRandomly',
    ).and.callThrough();
    store.repositionShipsRandomly();
    expect(repositionSpy).toHaveBeenCalledTimes(1);
    expect(store.ships().length).toBe(10);
    expect(store.fields().filter((field) => field.hasShip).length).toBe(20);
  });

  it('resets the board to the initial empty state', () => {
    store.createBoard();
    store.resetBoard();
    expect(store.board().fields).toEqual([]);
    expect(store.board().ships).toEqual([]);
  });

  it('updates a field through BoardService', () => {
    store.createBoard();
    const field = { ...store.fields()[0], isHit: true };
    store.updateField(field);
    expect(store.fields()[0].isHit).toBeTrue();
    expect(boardService.isFieldHit(store.board(), field.position)).toBeTrue();
  });

  it('updates a ship by id', () => {
    store.createBoard();
    const ship = store.ships()[0];
    const updatedShip = shipService.rotate(ship);
    store.updateShip(updatedShip);
    expect(store.ships()[0].direction).toBe(updatedShip.direction);
  });

  it('delegates occupied and hit queries to BoardService', () => {
    const ship = shipService.createShip({
      size: ShipSize.Small,
      direction: ShipDirection.Horizontal,
      startPosition: { row: 0, column: 0 },
    });
    spyOn(createShipsService, 'createRandomShips').and.returnValue([ship]);
    store.createBoard();
    expect(store.isFieldOccupied({ row: 0, column: 0 })).toBeTrue();
    expect(store.isFieldHit({ row: 0, column: 0 })).toBeFalse();
    store.updateField({ ...store.fields()[0], isHit: true });
    expect(store.isFieldHit({ row: 0, column: 0 })).toBeTrue();
  });
});
