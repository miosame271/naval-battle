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
import { Position } from '@entities/position';
import { Ship } from '@entities/ship';
import { CreateShipsService } from '@features/ships-collection';

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

  private readonly _currentState: WritableSignal<GameBoardState> = signal(
    INITIAL_GAME_BOARD_STATE,
  );

  public readonly board: Signal<Board> = computed(
    () => this._currentState().board,
  );
  public readonly fields: Signal<Field[]> = computed(() => this.board().fields);
  public readonly ships: Signal<Ship[]> = computed(() => this.board().ships);

  public createBoard(): void {
    const ships = this._createShipsService.createRandomShips();
    const board = this._boardService.createBoard(ships);
    this._currentState.update((state) => ({
      ...state,
      board,
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

  public isFieldOccupied(position: Position): boolean {
    return this._boardService.isFieldOccupied(
      this._currentState().board,
      position,
    );
  }

  public isFieldHit(position: Position): boolean {
    return this._boardService.isFieldHit(this._currentState().board, position);
  }
}
