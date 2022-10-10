import { TRowWord } from "src/models";
import create from "zustand";
import axios from "axios";
import { API_URL_WORDS } from "src/constants";
import { persist } from "zustand/middleware";

interface IWordsStore {
  rowsWords: TRowWord[];
  currentRowId: number;
  currentWord: string | null;
  pushLetterToCurrentRow: (letter: string, positionToAddLetter: number) => void;
  deleteLetterInCurrentRow: (positionToDelete: number) => void;
  updateCurrentRowWord: (rowWordLetters: TRowWord["word"]) => TRowWord[];
  getNewWord: () => void;
  restartBoard: () => void;
}

const initialRowsWordsData: TRowWord[] = Array.from(Array(5)).map((row, i) => ({
  word: Array.from(Array(5).fill({ letter: null, status: "wait" })),
  complete: false,
  id: i,
}));

export const useWordsStore = create<IWordsStore>()(
  persist(
    (set, get) => ({
      rowsWords: JSON.parse(JSON.stringify(initialRowsWordsData)),
      currentRowId: 0,
      currentWord: null,

      pushLetterToCurrentRow: (letter, positionToAddLetter) => {
        const { currentRowId, rowsWords } = get();

        const currentRowWords = rowsWords[currentRowId];

        const addLetter = (currentRowWords.word[positionToAddLetter] = {
          letter: letter,
          status: "wait",
        });

        const rowsWordsFilter = rowsWords.filter(
          (row) => row.id !== currentRowWords.id
        );

        const rowWordsUpdated = [...rowsWordsFilter, currentRowWords].sort(
          (a, b) => a.id - b.id
        );
        set((state) => ({
          ...state,
          rowsWords: rowWordsUpdated,
        }));
      },
      deleteLetterInCurrentRow: (positionToDelete) => {
        const { currentRowId, rowsWords } = get();
        const currentRowWords = rowsWords[currentRowId];

        const deleteLetter = (currentRowWords.word[positionToDelete] = {
          letter: null,
          status: "wait",
        });
        const rowsWordsFilter = rowsWords.filter(
          (row) => row.id !== currentRowWords.id
        );

        const rowsWordsUpdated = [...rowsWordsFilter, currentRowWords].sort(
          (a, b) => a.id - b.id
        );

        set((state) => ({
          ...state,
          rowsWords: rowsWordsUpdated,
        }));
      },
      updateCurrentRowWord: (rowWordLetters) => {
        const { currentRowId, rowsWords } = get();
        const rowToFilter = rowsWords[currentRowId];

        const rowsWordsFilter = rowsWords.filter(
          (row) => row.id !== rowToFilter.id
        );
        const rowToUpdate = {
          ...rowToFilter,
          complete: true,
          letters: rowWordLetters,
        };
        const rowsWordsUpdated = [...rowsWordsFilter, rowToUpdate].sort(
          (a, b) => a.id - b.id
        );
        let newCurrentRowId = currentRowId >= 4 ? 0 : currentRowId + 1;

        set((state) => ({
          ...state,
          rowsWords: rowsWordsUpdated,
          currentRowId: newCurrentRowId,
        }));

        return rowsWordsUpdated;
      },
      getNewWord: () => {
        axios
          .get(API_URL_WORDS)
          .then((resp) => {
            const { currentWord } = get();
            const words: string[] = JSON.parse(JSON.stringify(resp.data)).split(
              "\n"
            );
            const wordsWhitLengthAndNoRepeat = words.filter(
              (word) => word.length === 5 && word !== currentWord
            );

            const wordsWithoutAccents = wordsWhitLengthAndNoRepeat.filter(
              (word) => /^[a-zA-Z_]+$/.test(word)
            );
            const wordRandom =
              wordsWithoutAccents[
                Math.floor(Math.random() * wordsWithoutAccents.length)
              ].toUpperCase();

            set((state) => ({ ...state, currentWord: wordRandom }));

            /* dejo para que puedan saber que palabra se selecciono y puedan testear el funcionamiento */
            console.log("PARA TESTEAR FUNCIONAMIENTO DE LA APP", {
              "PALABRA SELECCIONADA": wordRandom,
            });
          })
          .catch((error) => console.log(error));
      },
      restartBoard: () =>
        set((state) => ({
          ...state,
          rowsWords: JSON.parse(JSON.stringify(initialRowsWordsData)),
          currentRowId: 0,
        })),
    }),
    {
      name: "wordsData",
      getStorage: () => localStorage,
    }
  )
);
