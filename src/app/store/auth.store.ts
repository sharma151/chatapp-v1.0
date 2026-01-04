import { create } from "zustand";

export type AuthUser = {
  id: string;
  name: string;
  email?: string;
};

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  accessToken: string | null;

  login: (payload: {
    user: AuthUser;
    accessToken: string;
  }) => void;

  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  accessToken: null,

  login: ({ user, accessToken }) => {
    localStorage.setItem("accessToken", accessToken);

    set({
      user,
      accessToken,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("accessToken");

    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },
}));
