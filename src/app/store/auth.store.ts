// src/app/store/auth.store.ts
import { create } from 'zustand'

type AuthState = {
  user: null | { id: string; name: string }
  isAuthenticated: boolean
  login: (user: AuthState['user']) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}))
