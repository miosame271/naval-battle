import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../model';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);

  public getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>(`/api/users/${userId}`).pipe(take(1));
  }
}
