import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Ship, ShipComponent, ShipService } from '@entities/ship';
import {
  CreateShipsService,
  RepositionShipsService,
} from '@features/ships-collection';

@Component({
  selector: 'app-area',
  imports: [NgClass, NgStyle, ShipComponent],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AreaComponent implements OnInit {
  readonly editable = input.required<boolean>();

  private readonly _shipService = inject(ShipService);
  private readonly _createShipsService = inject(CreateShipsService);
  private readonly _repositionShipsService = inject(RepositionShipsService);

  // TODO завести entity для поля, чтобы не использовать unknown
  fields: WritableSignal<unknown[]> = signal([]);
  ships: WritableSignal<Ship[]> = signal([]);

  ngOnInit(): void {
    this._createNewArea();
    this.ships.set(
      this._repositionShipsService.repositionShipsRandomly(
        this._createShipsService.createRandomShips(),
      ),
    );
  }

  // TODO перевеси позицию мышки в ShipPosition
  processClick(index: number): void {
    if (!this.editable) {
      this._shipService.fire({ row: 1, column: 1 });
    }
  }

  // TODO вынести в отдельный сервис
  private _createNewArea(): void {
    // for (let i = 1; i <= 10; i++) {
    //   for (let j = 1; j <= 10; j++) {
    //     this.fields.push({
    //       position: {
    //         row: i,
    //         column: j,
    //       },
    //       hasShip: false,
    //       isHit: false,
    //     });
    //   }
    // }
  }
}
