// import { create } from "zustand";

// const oldSessionStore = create((set) => ({
//     oldSessions: [],
//     setOldSessions: (newOldSession) => set({ oldSessions: newOldSession }), 
// }));

// export default oldSessionStore;


import { create } from "zustand";
import { persist } from "zustand/middleware";

const oldSessionStore = create(
  persist(
    (set) => ({
      oldSessions: [],
      setOldSessions: (newOldSession) => set({ oldSessions: newOldSession }),
    }),
    {
      name: "oldSessionStore",
    }
  )
);

export default oldSessionStore;