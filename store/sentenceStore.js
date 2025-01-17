import { create } from "zustand";
import { persist } from "zustand/middleware";

const sentenceStore = create(
  persist(
    (set) => ({
      selectedText: '',
      inputText: '',
      translatedText: '',
      showTranslation: false,
      sentences: [],
      
      setSelectedText: (text) => set({ selectedText: text }),
      setInputText: (text) => set({ inputText: text }),
      setTranslatedText: (text) => set({ translatedText: text }),
      setShowTranslation: (show) => set({ showTranslation: show }),
      setSentences: (newSentences) => set({ sentences: newSentences }), 
    }),
    {
      name: "sentence-storage",
      getStorage: () => localStorage,
    }
  )
);

export default sentenceStore;