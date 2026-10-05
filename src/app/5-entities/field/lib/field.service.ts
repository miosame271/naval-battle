import { Injectable } from '@angular/core';
import { Field } from '../model';

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  public createField(row: number, column: number): Field {
    return {
      position: {
        row,
        column,
      },
      hasShip: false,
      isHit: false,
    };
  }

  public setShip(field: Field, hasShip: boolean): Field {
    return {
      ...field,
      hasShip,
    };
  }

  public hit(field: Field): Field {
    return {
      ...field,
      isHit: true,
    };
  }

  public isOccupied(field: Field): boolean {
    return field.hasShip;
  }

  public isHit(field: Field): boolean {
    return field.isHit;
  }
}
