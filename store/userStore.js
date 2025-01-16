import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const userStore = create(
  persist(
    (set, get) => ({
      user: {
        userId: "",
        email: "",
      },

      setUser: (newUser) => set((state) => ({
        user: { ...state.user, ...newUser }
      })),

      setUserId: (userId) => set((state) => ({
        user: { ...state.user, userId }
      })),

      setEmail: (email) => set((state) => ({
        user: { ...state.user, email }
      }))
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
)
