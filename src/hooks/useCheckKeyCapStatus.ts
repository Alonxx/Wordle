import { TRowWord } from "src/models";

export const useCheckKeyCapStatus = () => {
  const checkKeyCapStatus = (keycap: string, rowWords: TRowWord[]) => {
    let status: null | string = null;
    rowWords.forEach((row) => {
      if (row.complete) {
        row.word.forEach((letters) => {
          if (
            letters.letter === keycap &&
            (letters.status === "inPosition" || letters.status === "wrong")
          ) {
            status = letters.status;
          }
        });
      }
    });

    return status;
  };

  return checkKeyCapStatus;
};
