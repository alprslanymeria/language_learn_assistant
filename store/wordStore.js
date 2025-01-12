import { create } from "zustand";

const wordStore = create((set) => ({
    
    words: [],

    setWords: (newWord) => set({ words: newWord }), 
}));

export default wordStore;