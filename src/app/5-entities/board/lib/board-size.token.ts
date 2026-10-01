import { InjectionToken } from '@angular/core';

export const BOARD_SIZE = new InjectionToken<number>('BOARD_SIZE', {
  providedIn: 'root',
  factory: () => 10,
});
