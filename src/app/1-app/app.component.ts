import { Component } from '@angular/core';
import { GameSessionComponent } from '@widgets/game-session';

@Component({
  selector: 'app-root',
  imports: [GameSessionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {}
