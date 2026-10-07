import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { ShipComponent } from '@entities/ship';
import { UserBoardStore } from '../../lib/user-board.store';
import { BOARD_SIZE } from '@entities/board';

@Component({
  selector: 'app-user-board',
  imports: [NgClass, NgStyle, ShipComponent],
  templateUrl: './user-board.component.html',
  styleUrl: './user-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class UserBoardComponent implements OnInit {
  public readonly editable = input.required<boolean>();

  private readonly _userBoardStore = inject(UserBoardStore);

  protected readonly boardSize = inject(BOARD_SIZE);
  protected readonly fields = computed(() => this._userBoardStore.fields());
  protected readonly ships = computed(() => this._userBoardStore.ships());

  public ngOnInit(): void {
    this._userBoardStore.createBoard();
  }

  public repositionShips(): void {
    this._userBoardStore.repositionShipsRandomly();
  }
  // TODO перевеси позицию мышки в ShipPosition
  processClick(index: number): void {
    if (this.editable()) {
      // TODO вызватть метод стрельбы из сервиса кораблей, передав позицию поля по position
    }
  }
}
