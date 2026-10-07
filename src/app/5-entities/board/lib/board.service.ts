import { Injectable, inject } from '@angular/core';
import { BOARD_SIZE } from './board-size.token';
import { Field, FieldService } from '@entities/field';
import { Ship, ShipService } from '@entities/ship';
import { Board } from '../model';
import { Position } from '@entities/position';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private readonly _boardSize = inject(BOARD_SIZE);
  private readonly _fieldService = inject(FieldService);
  private readonly _shipService = inject(ShipService);

  public createBoard(ships: Ship[] = []): Board {
    const board: Board = {
      fields: this.createFields(),
      ships,
    };

    return ships.reduce(
      (currentBoard, ship) =>
        this._shipService
          .getShipCells(ship)
          .reduce((boardWithShip, position) => {
            const field = this.getField(boardWithShip, position);

            if (!field) {
              return boardWithShip;
            }

            return this.updateField(
              boardWithShip,
              this._fieldService.setShip(field, true),
            );
          }, currentBoard),
      board,
    );
  }

  public createFields(): Field[] {
    return Array.from(
      { length: this._boardSize * this._boardSize },
      (_, index) => {
        const row = Math.floor(index / this._boardSize);
        const column = index % this._boardSize;

        return this._fieldService.createField(row, column);
      },
    );
  }

  public getField(board: Board, position: Position): Field | undefined {
    return board.fields.find(
      (field) =>
        field.position.row === position.row &&
        field.position.column === position.column,
    );
  }

  public updateField(board: Board, field: Field): Board {
    return {
      ...board,
      fields: board.fields.map((currentField) =>
        currentField.position.row === field.position.row &&
        currentField.position.column === field.position.column
          ? field
          : currentField,
      ),
    };
  }

  public hitField(board: Board, position: Position): Board {
    const field = this.getField(board, position);

    if (!field) {
      return board;
    }

    return this.updateField(board, this._fieldService.hit(field));
  }

  public isFieldOccupied(board: Board, position: Position): boolean {
    const field = this.getField(board, position);
    return field ? this._fieldService.isOccupied(field) : false;
  }

  public isFieldHit(board: Board, position: Position): boolean {
    const field = this.getField(board, position);
    return field ? this._fieldService.isHit(field) : false;
  }
}
