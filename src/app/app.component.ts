import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameSessionComponent } from '@widgets/game-session';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameSessionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {}
