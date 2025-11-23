import { Component, signal } from '@angular/core';
import { AreaComponent } from '@widgets/area';

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.scss'],
  imports: [AreaComponent],
  standalone: true
})
export class GameSessionComponent {
  gameStarted = signal(false);

  start(): void {
    this.gameStarted.set(true);
  }
}
