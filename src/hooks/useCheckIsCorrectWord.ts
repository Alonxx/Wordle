import { TRowWord } from "src/models";

export const useCheckIsCorrectWord = () => {
  const checkIsCorrectWord = (winnerWord: string, word: TRowWord["word"]) => {
    const isWinner = word.every((letter) => letter.status === "inPosition");

    return isWinner;
  };

  return checkIsCorrectWord;
};
