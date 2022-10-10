import { TRowWord } from "src/models";

export const useCheckLettersStatus = () => {
  const checkLettersStatus = (currentWord: string, word: TRowWord["word"]) => {
    const wordStatusUpdate = word;

    word.forEach((letters, i) => {
      if (letters.letter) {
        const isLetterInWord = currentWord.includes(letters.letter);
        if (isLetterInWord) {
          const isLetterInSamePosition = currentWord[i] === letters.letter;
          if (isLetterInSamePosition) {
            wordStatusUpdate[i].status = "inPosition";
          } else {
            wordStatusUpdate[i].status = "notPosition";
          }
        } else {
          wordStatusUpdate[i].status = "wrong";
        }
      }
    });

    return wordStatusUpdate;
  };

  return checkLettersStatus;
};
