import { create } from "zustand";
import { persist } from "zustand/middleware";

const wordStore = create(
  persist(
    (set) => ({
      words: [],
      index: 0,
      
      setWords: (newWord) => set({ words: newWord }), 
      setIndex: (newIndex) => set({ index: newIndex }),
    }),
    {
      name: "word-storage",
      getStorage: () => localStorage,
    }
  )
);

export default wordStore;