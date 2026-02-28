import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            role: null,
            login: (user) => set({ user, isAuthenticated: true, role: user.role }),
            logout: () => {
                set({ user: null, isAuthenticated: false, role: null });
                // Wipe persisted data from localStorage for security
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('brandly-auth');
                }
            },
            // Call this on layout mount to re-sync with the server JWT
            rehydrate: async () => {
                try {
                    const res = await fetch('/api/auth/me');
                    if (res.ok) {
                        const data = await res.json();
                        if (data.user) {
                            set({ user: data.user, isAuthenticated: true, role: data.user.role });
                        }
                    }
                } catch { /* silently fail */ }
            },
        }),
        {
            name: 'brandly-auth', // localStorage key
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                role: state.role,
            }),
        }
    )
);
