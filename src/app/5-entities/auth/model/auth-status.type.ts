export const AuthenticationStatus = {
  Idle: 'idle',
  Loading: 'loading',
  Success: 'success',
  Error: 'error',
} as const;

export type AuthenticationStatus =
  (typeof AuthenticationStatus)[keyof typeof AuthenticationStatus];
