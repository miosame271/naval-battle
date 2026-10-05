import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { GameSessionStore } from '../../store/game-session.store';
import { UserBoardComponent } from '@widgets/user-board';

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.scss'],
  imports: [UserBoardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class GameSessionComponent {
  private readonly _gameSessionStore = inject(GameSessionStore);

  gameStarted: Signal<boolean> = this._gameSessionStore.gameStarted;

  start(): void {
    this._gameSessionStore.setGameStarted(true);
  }
}
