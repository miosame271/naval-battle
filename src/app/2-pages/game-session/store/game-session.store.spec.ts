import { TestBed } from '@angular/core/testing';
import {
  GameSessionStore,
  INITIAL_GAME_SESSION_STATE,
} from './game-session.store';

describe('GameSessionStore', () => {
  let store: GameSessionStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(GameSessionStore);
  });

  it('creates the store with INITIAL_GAME_SESSION_STATE', () => {
    expect(store.currentState()).toEqual(INITIAL_GAME_SESSION_STATE);
  });

  describe('currentState', () => {
    it('returns the initial state', () => {
      expect(store.currentState()).toEqual(INITIAL_GAME_SESSION_STATE);
    });

    it('returns the updated state after setGameStarted changes gameStarted', () => {
      store.setGameStarted(true);

      expect(store.currentState()).toEqual({
        ...INITIAL_GAME_SESSION_STATE,
        gameStarted: true,
      });
    });
  });

  describe('gameStarted', () => {
    it('returns false for the initial state', () => {
      expect(store.gameStarted()).toBeFalse();
    });

    it('returns true after gameStarted is updated to true', () => {
      store.setGameStarted(true);

      expect(store.gameStarted()).toBeTrue();
    });
  });

  describe('loading', () => {
    it('returns false for the initial state', () => {
      expect(store.loading()).toBeFalse();
    });

    it('returns false from the updated state', () => {
      store.setGameStarted(true);

      expect(store.loading()).toBeFalse();
    });
  });

  describe('saving', () => {
    it('returns false for the initial state', () => {
      expect(store.saving()).toBeFalse();
    });

    it('returns false from the updated state', () => {
      store.setGameStarted(true);

      expect(store.saving()).toBeFalse();
    });
  });

  describe('setGameStarted', () => {
    it('sets gameStarted to true', () => {
      store.setGameStarted(true);

      expect(store.gameStarted()).toBeTrue();
      expect(store.currentState()).toEqual({
        ...INITIAL_GAME_SESSION_STATE,
        gameStarted: true,
      });
    });

    it('sets gameStarted to false', () => {
      store.setGameStarted(true);
      store.setGameStarted(false);

      expect(store.gameStarted()).toBeFalse();
      expect(store.currentState()).toEqual(INITIAL_GAME_SESSION_STATE);
    });
  });
});
