import { keysCapsValid } from "src/constants";

export const useCheckIsValidKeyCap = () => {
  const [keyRowA, keyRowB, keyRowC] = keysCapsValid;

  const checkIsValidKeyCap = (key: string) => {
    if (
      keyRowA.some((keycap) => keycap === key) ||
      keyRowB.some((keycap) => keycap === key) ||
      keyRowC.some((keycap) => keycap === key)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return checkIsValidKeyCap;
};
