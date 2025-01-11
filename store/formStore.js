import create from 'zustand';

const formStore = create((set) => ({
    selectedText: '',
    inputText: '',
    translatedText: '',
    showTranslation: false,
    sentences: [],
    
    setSelectedText: (text) => set({ selectedText: text }),
    setInputText: (text) => set({ inputText: text }),
    setTranslatedText: (text) => set({ translatedText: text }),
    setShowTranslation: (show) => set({ showTranslation: show }),
    setSentences: (newSentences) => set((state) => ({ sentences: [...state.sentences, ...newSentences] })),
}));

export default formStore;