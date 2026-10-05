import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Field } from '@entities/field';
import { Ship, ShipComponent } from '@entities/ship';
import { UserBoardStore } from '../../lib/user-board.store';

@Component({
  selector: 'app-user-board',
  imports: [NgClass, NgStyle, ShipComponent],
  templateUrl: './user-board.component.html',
  styleUrl: './user-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class UserBoardComponent implements OnInit {
  readonly editable = input.required<boolean>();

  private readonly _userBoardStore = inject(UserBoardStore);

  readonly fields: Signal<Field[]> = computed(() =>
    this._userBoardStore.fields(),
  );
  readonly ships: Signal<Ship[]> = computed(() => this._userBoardStore.ships());

  ngOnInit(): void {
    this._userBoardStore.createBoard();
  }

  // TODO перевеси позицию мышки в ShipPosition
  processClick(index: number): void {
    if (this.editable()) {
      // TODO вызватть метод стрельбы из сервиса кораблей, передав позицию поля по position
    }
  }
}
