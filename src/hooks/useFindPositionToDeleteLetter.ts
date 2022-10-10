import { useCallback } from "react";
import { TRowWord } from "src/models";

export const useFindPositionToDeleteLetter = (
  currentRowId: number,
  rowsWords: TRowWord[]
) => {
  const findPositionToDeleteLetter = useCallback(() => {
    const currentRow = rowsWords[currentRowId];
    const currentRowWords = currentRow.word;
    let positionToDeleteLetter = -1;

    for (let i = currentRowWords.length - 1; i >= 0; i--) {
      if (currentRowWords[i].letter !== null) {
        positionToDeleteLetter = i;
        break;
      }
    }

    return positionToDeleteLetter;
  }, [currentRowId, rowsWords]);

  return findPositionToDeleteLetter;
};
