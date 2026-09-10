import {
  computed,
  inject,
  Injectable,
  InjectionToken,
  signal,
} from '@angular/core';
import {
  AuthenticationStatus,
  LoginCredentials,
  LoginFormState,
} from '@entities/auth';

const defaultState: LoginFormState = {
  status: AuthenticationStatus.Idle,
  error: null,
  isLogged: false,
};

export interface AuthenticationApiService {
  login(credentials: LoginCredentials): Promise<void>;
}

export const AUTHENTICATION_API_SERVICE =
  new InjectionToken<AuthenticationApiService>('AUTHENTICATION_API_SERVICE');

@Injectable({
  providedIn: 'root',
})
export class LoginFormStore {
  private readonly authenticationApiService = inject(
    AUTHENTICATION_API_SERVICE,
  );

  private readonly state = signal<LoginFormState>(defaultState);

  public readonly status = computed(() => this.state().status);
  public readonly error = computed(() => this.state().error);
  public readonly isLogged = computed(() => this.state().isLogged);

  public setStatus(status: AuthenticationStatus): void {
    this.state.update((currentState) => ({
      ...currentState,
      status,
    }));
  }

  public setError(error: string | null): void {
    this.state.update((currentState) => ({
      ...currentState,
      error,
    }));
  }

  public setIsLogged(isLogged: boolean): void {
    this.state.update((currentState) => ({
      ...currentState,
      isLogged,
    }));
  }

  public reset(): void {
    this.state.set(defaultState);
  }

  public async login(credentials: LoginCredentials): Promise<void> {
    this.state.set({
      status: 'loading',
      error: null,
      isLogged: false,
    });

    try {
      await this.authenticationApiService.login(credentials);

      this.state.set({
        status: 'success',
        error: null,
        isLogged: true,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Не удалось выполнить авторизацию';

      this.state.set({
        status: 'error',
        error: errorMessage,
        isLogged: false,
      });
    }
  }
}
