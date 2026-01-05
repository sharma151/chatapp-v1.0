export interface LoginFormInterface {
  email?: string;
  password: string;
  remember_me?: string | boolean;
  username?: string;
}

export interface RegisterFormInterface {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  [key: string]: unknown;
}

export interface RegisterFormResponse {
  statusCode: number;
  data: {
    user: User;
  };
  message: string;
  success: boolean;
}
export interface Avatar {
  url: string;
  localPath: string;
  _id: string;
}

export interface User {
  _id: string;
  avatar: Avatar;
  username: string;
  email: string;
  role: string;
  loginType: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
  statusCode: number;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  success: boolean;
}
