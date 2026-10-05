import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameSessionComponent } from '@pages/game-session';

@Component({
  selector: 'app-root',
  imports: [GameSessionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AppComponent {}
