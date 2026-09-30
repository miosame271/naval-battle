import { NgClass, NgStyle } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Ship, ShipComponent } from '@entities/ship';
import { CreateShipsService } from '@features/create-ships';

@Component({
  selector: 'app-area',
  imports: [NgClass, NgStyle, ShipComponent],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss',
  standalone: true,
})
export class AreaComponent implements OnInit {
  @Input() editable = true;

  private readonly _createShipsService = inject(CreateShipsService);

  // fields: Field[] = [];
  fields: WritableSignal<unknown[]> = signal([]);
  ships: WritableSignal<Ship[]> = signal([]);
  loading: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {
    this._createNewArea();
    this._createNewShips();

    this.loading.set(false);
  }

  processClick(index: number): void {
    if (!this.editable) {
      this._fire(index);
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

  private _createNewShips(): void {
    this.ships.set(this._createShipsService.createShips());
  }

  private _fire(index: number): void {
    // TODO ship.hit(position);
  }
}
