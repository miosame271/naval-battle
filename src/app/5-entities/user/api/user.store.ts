import { Injectable, signal, computed, inject } from '@angular/core';
import { User } from '../model';
import { UserService } from './user.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private readonly apiService = inject(UserService);
  private readonly currentUserState = signal<User | null>(null);

  public readonly currentUser = computed(() => this.currentUserState());
  public readonly userId = computed(() => this.currentUserState()?.id ?? null);
  public readonly username = computed(
    () => this.currentUserState()?.username ?? null,
  );

  public setCurrentUser(user: User): void {
    this.currentUserState.set(user);
  }

  public clearCurrentUser(): void {
    this.currentUserState.set(null);
  }

  public async setNewUser(userId: string): Promise<void> {
    try {
      const user = await firstValueFrom(this.apiService.getUserById(userId));
      this.clearCurrentUser();
      this.setCurrentUser(user);
    } catch (error: unknown) {
      console.error(error);
    }
  }
}
