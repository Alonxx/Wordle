import { TRowWord } from "src/models";

export const useCheckIsLoser = () => {
  const checkIsLoser = (rowsWords: TRowWord[]) => {
    const isLoser = rowsWords.some((row) => row.complete === false);

    return !isLoser;
  };

  return checkIsLoser;
};
