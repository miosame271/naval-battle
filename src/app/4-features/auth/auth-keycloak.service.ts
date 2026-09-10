import { Injectable, inject } from '@angular/core';
import { Keycloak } from 'keycloak';

// TODO перекинуть в app
export const KEYCLOAK_CONFIGURATION = {};

@Injectable({
  providedIn: 'root',
})
export class AuthKeycloakService {
  private readonly keycloakConfiguration: unknown = inject(
    KEYCLOAK_CONFIGURATION,
  );

  private readonly keycloak = new Keycloak({
    url: this.keycloakConfiguration.url,
    realm: this.keycloakConfiguration.realm,
    clientId: this.keycloakConfiguration.clientId,
  });

  private initialized = false;

  public async initialize(): Promise<boolean> {
    if (this.initialized) {
      return this.keycloak.authenticated ?? false;
    }

    const authenticated = await this.keycloak.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      checkLoginIframe: false,
    });

    this.initialized = true;

    return authenticated;
  }

  public async login(loginIdentifier: string): Promise<void> {
    const loginOptions: KeycloakLoginOptions = {
      loginHint: loginIdentifier.trim(),
      redirectUri: window.location.origin,
    };

    await this.keycloak.login(loginOptions);
  }

  public async logout(): Promise<void> {
    await this.keycloak.logout({
      redirectUri: window.location.origin,
    });
  }

  public getToken(): Promise<string> {
    if (!this.initialized) {
      return Promise.reject(
        new Error(
          'AuthenticationService must be initialized before requesting a token.',
        ),
      );
    }

    return this.keycloak.updateToken(30).then(() => {
      if (!this.keycloak.token) {
        throw new Error('Keycloak token is unavailable.');
      }

      return this.keycloak.token;
    });
  }
}
