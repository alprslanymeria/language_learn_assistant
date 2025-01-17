import { create } from "zustand";
import { persist } from "zustand/middleware";

const wordStore = create(
  persist(
    (set) => ({
      words: [],
      
      setWords: (newWord) => set({ words: newWord }), 
    }),
    {
      name: "word-storage",
      getStorage: () => localStorage,
    }
  )
);

export default wordStore;