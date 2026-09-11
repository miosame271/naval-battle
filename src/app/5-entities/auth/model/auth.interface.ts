export interface AuthenticationResult {
  isAuthenticated: boolean;
  token: string | undefined;
  refreshToken: string | undefined;
}

export interface LoginFormState {
  status: AuthenticationStatus;
  error: string | null;
  isLogged: boolean;
}

export interface LoginCredentials {
  readonly login: string;
  readonly password: string;
}

export const AuthenticationStatus = {
  Idle: 'idle',
  Loading: 'loading',
  Success: 'success',
  Error: 'error',
} as const;

export type AuthenticationStatus =
  (typeof AuthenticationStatus)[keyof typeof AuthenticationStatus];

export interface AuthenticationApiService {
  login(credentials: LoginCredentials): Promise<void>;
}
