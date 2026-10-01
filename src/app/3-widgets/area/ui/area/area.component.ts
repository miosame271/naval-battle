import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Ship, ShipComponent, ShipService } from '@entities/ship';

@Component({
  selector: 'app-area',
  imports: [NgClass, NgStyle, ShipComponent],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AreaComponent implements OnInit {
  @Input() editable = true;

  private readonly _shipService = inject(ShipService);

  // fields: Field[] = [];
  fields: WritableSignal<unknown[]> = signal([]);
  ships: WritableSignal<Ship[]> = signal([]);
  loading: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {
    this._createNewArea();
    this.ships.set(this._shipService.createShips());

    this.loading.set(false);
  }

  // TODO перевеси позицию мышки в ShipPosition
  processClick(index: number): void {
    if (!this.editable) {
      this._shipService.fire({ row: 1, column: 1 });
    }
  }

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
