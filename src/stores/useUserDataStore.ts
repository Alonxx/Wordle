import create from "zustand";
import { persist } from "zustand/middleware";

interface IUserDataStore {
  plays: number;
  wins: number;
  timeStamp: number;
  isCurrentWinner: boolean | null;
  isCurrentWordPlayed: boolean;
  isFirtsTime: boolean;
  themeMode: "dark" | "light";
  setPlays: (plays: number) => void;
  setWins: (wins: number) => void;
  setIsCurrentWinner: (isCurrentWinner: boolean | null) => void;
  setFirtsTime: (isFirtsTime: boolean) => void;
  setTimeStamp: (time: number) => void;
  setThemeMode: (themeMode: "dark" | "light") => void;
}

export const useUserDataStore = create<IUserDataStore>()(
  persist(
    (set) => ({
      plays: 0,
      wins: 0,
      timeStamp: -1,
      isCurrentWinner: null,
      isCurrentWordPlayed: false,
      isFirtsTime: true,
      themeMode: "light",
      setThemeMode: (themeMode) => set((state) => ({ ...state, themeMode })),
      setFirtsTime: (isFirtsTime) =>
        set((state) => ({ ...state, isFirtsTime })),
      setPlays: (plays) => set((state) => ({ ...state, plays })),
      setWins: (wins) => set((state) => ({ ...state, wins })),
      setIsCurrentWinner: (isCurrentWinner) => {
        if (isCurrentWinner === null) {
          set({ isCurrentWinner, isCurrentWordPlayed: false });
        } else {
          set((state) => ({
            ...state,
            isCurrentWinner,
            plays: state.plays + 1,
            wins: isCurrentWinner ? state.wins + 1 : state.wins,
            isCurrentWordPlayed: true,
          }));
        }
      },
      setTimeStamp: (timeStamp) => set((state) => ({ ...state, timeStamp })),
    }),
    {
      name: "userData",
      getStorage: () => localStorage,
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["isCurrentWordPlayed"].includes(key)
          )
        ),
    }
  )
);
