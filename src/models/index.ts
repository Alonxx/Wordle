export type TRowWord = {
  word: { letter: string | null; status: TStatusBox }[];
  complete: boolean;
  id: number;
};

export type TStatusBox =
  | "idle"
  | "wait"
  | "inPosition"
  | "notPosition"
  | "wrong";
