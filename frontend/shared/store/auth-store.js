import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    role: null,
    login: (user) => set({ user, isAuthenticated: true, role: user.role }),
    logout: () => set({ user: null, isAuthenticated: false, role: null }),
}));
