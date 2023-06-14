export interface UsersResponse {
  success: boolean;
  message?: string;
  users?: User[];
}

export interface UserResponse {
  success: boolean;
  message?: string;
  user?: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  level: number;
  registration_date: Date;
}
