import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Board, BoardService, GameBoardState } from '@entities/board';
import { Field } from '@entities/field';
import { Ship, ShipPosition } from '@entities/ship';
import {
  CreateShipsService,
  RepositionShipsService,
} from '@features/ships-collection';

const INITIAL_GAME_BOARD_STATE: GameBoardState = {
  board: {
    fields: [],
    ships: [],
  },
};

@Injectable({
  providedIn: 'root',
})
export class UserBoardStore {
  private readonly _boardService = inject(BoardService);
  private readonly _createShipsService = inject(CreateShipsService);
  private readonly _repositionShipsService = inject(RepositionShipsService);

  private readonly _currentState: WritableSignal<GameBoardState> = signal(
    INITIAL_GAME_BOARD_STATE,
  );

  public readonly currentState: Signal<GameBoardState> = computed(() =>
    this._currentState(),
  );
  public readonly board: Signal<Board> = computed(
    () => this.currentState().board,
  );
  public readonly fields: Signal<Field[]> = computed(() => this.board().fields);
  public readonly ships: Signal<Ship[]> = computed(() => this.board().ships);

  public createBoard(): void {
    const fields = this._boardService.createFields();
    const ships = this._repositionShipsService.repositionShipsRandomly(
      this._createShipsService.createRandomShips(),
    );
    this._currentState.update((state) => ({
      ...state,
      board: { fields, ships },
    }));
  }

  public resetBoard(): void {
    this._currentState.set(INITIAL_GAME_BOARD_STATE);
  }

  public updateField(field: Field): void {
    const updatedBoard = this._boardService.updateField(
      this._currentState().board,
      field,
    );
    this._currentState.update((state) => ({ ...state, board: updatedBoard }));
  }

  public updateShip(ship: Ship): void {
    const updatedShips = this._currentState().board.ships.map((s) =>
      s.id === ship.id ? ship : s,
    );
    const updatedBoard = { ...this._currentState().board, ships: updatedShips };
    this._currentState.update((state) => ({ ...state, board: updatedBoard }));
  }

  public isFieldOccupied(position: ShipPosition): boolean {
    return this._boardService.isFieldOccupied(
      this._currentState().board,
      position,
    );
  }

  public isFieldHit(position: ShipPosition): boolean {
    return this._boardService.isFieldHit(this._currentState().board, position);
  }
}
