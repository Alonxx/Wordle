import React from "react";
import { BoardHeader, RowWordsBoxs, VirtualKeyBoard } from "src/components";
import {
  useCheckIsValidKeyCap,
  useCheckLettersStatus,
  useFindPositionToAddLetter,
  useCheckIsCorrectWord,
  useCheckIsLoser,
  useFindPositionToDeleteLetter,
  useCreateTimeToNewWord,
} from "src/hooks";
import { TRowWord } from "src/models";
import { useWordsStore, useUserDataStore } from "src/stores";

export const Board: React.FC = () => {
  const isValidKeyCap = useCheckIsValidKeyCap();
  const {
    pushLetterToCurrentRow,
    currentRowId,
    rowsWords,
    updateCurrentRowWord,
    getNewWord,
    currentWord,
    deleteLetterInCurrentRow,
    restartBoard,
  } = useWordsStore();
  const { setIsCurrentWinner, isCurrentWinner, setTimeStamp, timeStamp } =
    useUserDataStore();
  const checkIsLoser = useCheckIsLoser();
  const findPositionToAddLetter = useFindPositionToAddLetter(
    currentRowId,
    rowsWords
  );
  const findPositionToDeleteLetter = useFindPositionToDeleteLetter(
    currentRowId,
    rowsWords
  );
  const checkLettersStatus = useCheckLettersStatus();
  const checkIsCorrectWord = useCheckIsCorrectWord();
  const { currentTimeStamp } = useCreateTimeToNewWord(getNewWord, timeStamp);

  React.useEffect(() => {
    if (currentTimeStamp !== timeStamp) {
      setTimeStamp(currentTimeStamp);
      restartGame();
    }
  }, [currentTimeStamp]);

  const restartGame = () => {
    restartBoard();
    setIsCurrentWinner(null);
  };

  const checkIsWinnerOrLoser = (
    currentRowsWords: TRowWord[],
    rowWordsResult: TRowWord["word"]
  ) => {
    if (checkIsCorrectWord("VOCAL", rowWordsResult)) {
      setIsCurrentWinner(true);
      return;
    }
    if (checkIsLoser(currentRowsWords)) {
      setIsCurrentWinner(false);
      return;
    }
  };

  const handleKeyCapPress = (key: string) => {
    if (isCurrentWinner === null && currentWord) {
      switch (key) {
        case "ENTER":
          if (
            rowsWords[currentRowId].word.every(
              (letters) => letters.letter !== null
            )
          ) {
            const rowWordsResult = checkLettersStatus(
              currentWord,
              rowsWords[currentRowId].word
            );
            const rowWordsUpdated = updateCurrentRowWord(rowWordsResult);
            checkIsWinnerOrLoser(rowWordsUpdated, rowWordsResult);
          }
          break;
        case "BACKSPACE":
          const positionToDelete = findPositionToDeleteLetter();
          positionToDelete !== -1 && deleteLetterInCurrentRow(positionToDelete);
          break;
        default:
          if (isValidKeyCap(key)) {
            const positionToAdd = findPositionToAddLetter();
            positionToAdd !== -1 && pushLetterToCurrentRow(key, positionToAdd);
          }
          break;
      }
    }
  };

  return (
    <div className="flex flex-col items-center dark:bg-blue-dark">
      <BoardHeader />
      <div className="mt-[87px] flex flex-col gap-[11px]">
        {rowsWords.map((row) => (
          <RowWordsBoxs key={row.id} word={row.word} />
        ))}
      </div>
      <div className="mt-[54px] mb-[165px]">
        <VirtualKeyBoard handleKeyCapPress={handleKeyCapPress} />
      </div>
    </div>
  );
};
