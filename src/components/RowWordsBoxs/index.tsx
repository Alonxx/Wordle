import { TRowWord } from "src/models";
import { WordBox } from "../WordBox";

interface Props {
  word: TRowWord["word"];
}

export const RowWordsBoxs: React.FC<Props> = ({ word }) => {
  return (
    <div className="flex flex-row gap-[11px]">
      {word.map((letters, i) => (
        <WordBox key={i} status={letters.status} word={letters.letter} />
      ))}
    </div>
  );
};
