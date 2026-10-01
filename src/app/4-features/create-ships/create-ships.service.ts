import { inject, Injectable } from '@angular/core';
import { Ship, ShipDirection, ShipService, ShipSize } from '@entities/ship';

@Injectable({
  providedIn: 'root',
})
export class CreateShipsService {
  private readonly _shipService = inject(ShipService);

  public createRandomShips(): Ship[] {
    const largeShip = this._shipService.createShip({
      direction: ShipDirection.Horizontal,
      size: ShipSize.Large,
      startPosition: {
        row: 2,
        column: 2,
      },
    });
    const [bigShip1, bigShip2] = Array.from({ length: 2 }, (_, i) =>
      this._shipService.createShip({
        direction: ShipDirection.Horizontal,
        size: ShipSize.Big,
        startPosition: {
          row: 4,
          column: 2 + i * 3,
        },
      }),
    );
    const [mediumShip1, mediumShip2, mediumShip3] = Array.from(
      { length: 3 },
      (_, i) =>
        this._shipService.createShip({
          direction: ShipDirection.Horizontal,
          size: ShipSize.Medium,
          startPosition: {
            row: 6,
            column: 2 + i * 2,
          },
        }),
    );
    const [smallShip1, smallShip2, smallShip3, smallShip4] = Array.from(
      { length: 4 },
      (_, i) =>
        this._shipService.createShip({
          direction: ShipDirection.Horizontal,
          size: ShipSize.Small,
          startPosition: {
            row: 6,
            column: i + 2,
          },
        }),
    );
    return [
      largeShip,
      bigShip1,
      bigShip2,
      mediumShip1,
      mediumShip2,
      mediumShip3,
      smallShip1,
      smallShip2,
      smallShip3,
      smallShip4,
    ];
  }
}
