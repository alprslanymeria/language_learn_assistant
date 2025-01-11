import create from 'zustand';

const oldSessionStore = create((set) => ({
    oldSessions: [],
    setOldSessions: (newOldSession) => set((state) => ({ oldSessions: [...state.oldSessions, ...newOldSession] })),
}));

export default oldSessionStore;