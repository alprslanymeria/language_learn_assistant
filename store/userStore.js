import { create } from 'zustand'

export const userStore = create((set, get) => ({

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

}))
