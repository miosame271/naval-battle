import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { GameSessionState } from '@entities/game-session';

const INITIAL_GAME_SESSION_STATE: GameSessionState = {
  gameStarted: false,
  loading: false,
  saving: false,
};

@Injectable({
  providedIn: 'root',
})
export class GameSessionStore {
  private readonly _currentState: WritableSignal<GameSessionState> = signal(
    INITIAL_GAME_SESSION_STATE,
  );

  public readonly currentState: Signal<GameSessionState> = computed(() =>
    this._currentState(),
  );
  public readonly gameStarted: Signal<boolean> = computed(
    () => this._currentState().gameStarted,
  );
  public readonly loading: Signal<boolean> = computed(
    () => this._currentState().loading,
  );
  public readonly saving: Signal<boolean> = computed(
    () => this._currentState().saving,
  );

  public setGameStarted(gameStarted: boolean): void {
    this._currentState.update((state) => ({ ...state, gameStarted }));
  }
}
