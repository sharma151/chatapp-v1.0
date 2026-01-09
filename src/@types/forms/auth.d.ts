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
export interface ProfileAccount {
  _id: string;
  avatar: Avatar; // Reusing your existing Avatar interface
  username: string;
  email: string;
  isEmailVerified: boolean;
}

export interface UserProfile {
  _id: string;
  coverImage: Avatar; // Reusing your existing Avatar interface
  firstName: string;
  lastName: string;
  bio: string;
  dob: string;
  location: string;
  countryCode: string;
  phoneNumber: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  account: ProfileAccount;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
}

// 3. The API Response wrapper
export interface UserProfileResponse {
  statusCode: number;
  data: UserProfile;
  message: string;
  success: boolean;
}