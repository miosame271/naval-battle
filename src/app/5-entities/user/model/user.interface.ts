export interface User {
  id: string;
  username: string;
  email: string;
}

export interface UserApiService {
  getUserById(userId: string): Promise<User>;
}
