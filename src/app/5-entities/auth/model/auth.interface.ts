import { AuthenticationStatus } from './auth-status.type';
import { LoginCredentials } from './login.interface';

export interface AuthenticationUser {
  readonly id: string;
  readonly login: string;
}

export interface AuthenticationSuccess {
  readonly user: AuthenticationUser;
  readonly accessToken: string;
}

export interface AuthenticationFailure {
  readonly message: string;
  readonly code?: string;
}

export interface AuthenticationApi {
  login(credentials: LoginCredentials): Promise<AuthenticationSuccess>;
  logout(): Promise<void>;
}

export interface LoginFormState {
  status: AuthenticationStatus;
  error: string | null;
  isLogged: boolean;
}
