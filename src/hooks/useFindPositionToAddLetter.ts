import { useCallback } from "react";
import { TRowWord } from "src/models";

export const useFindPositionToAddLetter = (
  currentRowId: number,
  rowsWords: TRowWord[]
) => {
  const findPositionToUpdateWordBox = useCallback(() => {
    const currentRow = rowsWords[currentRowId];
    const currentRowWords = currentRow.word;
    const positionToAddLetter = currentRowWords.findIndex(
      (position) => position.letter === null
    );

    return positionToAddLetter;
  }, [currentRowId, rowsWords]);

  return findPositionToUpdateWordBox;
};
