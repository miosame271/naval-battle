import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { AreaComponent } from '@widgets/area';
import { GameSessionStore } from '@widgets/game-session';

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.scss'],
  imports: [AreaComponent],
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
