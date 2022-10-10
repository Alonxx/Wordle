import { TStatusBox } from "src/models";

interface Props {
  status: TStatusBox;
  word: string | null;
}

export const WordBox: React.FC<Props> = ({ status, word }) => {
  return (
    <div className={`box_word ${status} ${status !== "wait" && "text-white"}`}>
      <span className="font-bold text-[35px] leading-[41px] ">{word}</span>
    </div>
  );
};
