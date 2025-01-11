// import { create } from 'zustand'

// export const sessionStore = create((set, get) => ({

//     info: {
//         language: "",
//         practice: "",
//         imagePath: ""
//     },

//     setInfo: (newInfo) => set((state) => ({
//         user: { ...state.info, ...newInfo }
//     })),

//     setLanguage: (language) => set((state) => ({
//         user: { ...state.info, language }
//     })),

//     setPractice: (practice) => set((state) => ({
//         user: { ...state.info, practice }
//     })),

//     setImagePath: (imagePath) => set((state) => ({
//         user: { ...state.info, imagePath }
//     }))

// }))


import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const sessionStore = create(
  persist(
    (set, get) => ({
      info: {
        language: "",
        practice: "",
        imagePath: "",
        sessionId: ""
      },

      setInfo: (newInfo) => set((state) => ({
        info: { ...state.info, ...newInfo }
      })),

      setLanguage: (language) => set((state) => ({
        info: { ...state.info, language }
      })),

      setPractice: (practice) => set((state) => ({
        info: { ...state.info, practice }
      })),

      setImagePath: (imagePath) => set((state) => ({
        info: { ...state.info, imagePath }
      })),

      setSessionId: (sessionId) => set((state) => ({
        info: { ...state.info, sessionId }
      }))

    }),
    {
      name: 'session-storage',
      getStorage: () => localStorage,
    }
  )
)
