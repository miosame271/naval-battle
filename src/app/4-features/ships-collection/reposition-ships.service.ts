import { inject, Injectable } from '@angular/core';
import { Ship } from '@entities/ship';
import { RandomShipService } from '@features/random-ship';

@Injectable({
  providedIn: 'root',
})
export class RepositionShipsService {
  private readonly _randomService = inject(RandomShipService);

  public repositionShipsRandomly(ships: Ship[]): Ship[] {
    return this._randomService.randomizeShipsCollection(ships);
  }
}
