import { DestroyRef, Injectable, inject } from '@angular/core';
import Keycloak, { KeycloakLoginOptions } from 'keycloak-js';
import {
  Observable,
  from,
  take,
  map,
  catchError,
  throwError,
  distinctUntilChanged,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthenticationResult } from '../model';

@Injectable({
  providedIn: 'root',
})
export class AuthKeycloakService {
  private readonly keycloak: Keycloak = inject(Keycloak);
  private destroyRef: DestroyRef = inject(DestroyRef);

  public login(
    options?: KeycloakLoginOptions,
  ): Observable<AuthenticationResult> {
    return from(this.keycloak.login(options)).pipe(
      takeUntilDestroyed(this.destroyRef),
      distinctUntilChanged(),
      map(() => this.getAuthenticationResult()),
      catchError((error: unknown) => throwError(() => error)),
    );
  }

  public refreshToken(minValidity = 30): Observable<AuthenticationResult> {
    return from(this.keycloak.updateToken(minValidity)).pipe(
      takeUntilDestroyed(this.destroyRef),
      distinctUntilChanged(),
      map(() => this.getAuthenticationResult()),
      catchError((error: unknown) => throwError(() => error)),
    );
  }

  private getAuthenticationResult(): AuthenticationResult {
    return {
      isAuthenticated: this.keycloak.authenticated ?? false,
      token: this.keycloak.token,
      refreshToken: this.keycloak.refreshToken,
    };
  }
}
