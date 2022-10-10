import React, { useCallback } from "react";
import { keysCapsValid } from "src/constants";
import { useCheckKeyCapStatus } from "src/hooks";
import { useWordsStore, useUserDataStore } from "src/stores";

interface Props {
  handleKeyCapPress: (key: string) => void;
}

export const VirtualKeyBoard: React.FC<Props> = ({ handleKeyCapPress }) => {
  const [keyRowA, keyRowB, keyRowC] = keysCapsValid;

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      handleKeyCapPress(e.key.toUpperCase());
    },
    [handleKeyCapPress]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className=" w-[638px] h-[238px] rounded-[15px] bg-gray-keyboard dark:bg-blue-dark-light">
      <div className="keyboard_row  p-[33px_52.6px_0px_52.6px]">
        {keyRowA.map((key, i) => (
          <KeyCap key={i} keycap={key} handleKeyCapPress={handleKeyCapPress} />
        ))}
      </div>
      <div className="keyboard_row mt-[9.57px] pl-[68px] pr-[37.21px]">
        {keyRowB.map((key, i) => (
          <KeyCap key={i} keycap={key} handleKeyCapPress={handleKeyCapPress} />
        ))}
      </div>
      <div className="keyboard_row mt-[9.57px] before:gap-[9.57px] pl-[20px] pr-[85.22px]">
        {keyRowC.map((key, i) => (
          <KeyCap key={i} keycap={key} handleKeyCapPress={handleKeyCapPress} />
        ))}
      </div>
    </div>
  );
};

const KeyCap: React.FC<{
  keycap: string;
  handleKeyCapPress: (key: string) => void;
}> = ({ keycap, handleKeyCapPress }) => {
  const [keyCapStatus, setKeyCapStatus] = React.useState<string | null>(null);

  const { rowsWords, currentRowId } = useWordsStore();
  const { isCurrentWinner } = useUserDataStore();

  const checkKeyCapStatus = useCheckKeyCapStatus();

  React.useEffect(() => {
    if (currentRowId > 0 && keyCapStatus === null) {
      const status = checkKeyCapStatus(keycap, rowsWords);
      setKeyCapStatus(status);
    }
  }, [currentRowId]);

  React.useEffect(() => {
    isCurrentWinner !== null && setKeyCapStatus(null);
  }, [isCurrentWinner]);

  const isEspecialKeycap: boolean =
    keycap === "ENTER" || keycap === "\u232b" ? true : false;

  const handleOnClickKeyCap = (key: string) => {
    if (key === "\u232b") {
      handleKeyCapPress("BACKSPACE");
    } else {
      handleKeyCapPress(key);
    }
  };

  return (
    <button
      onClick={(e) => {
        handleOnClickKeyCap(keycap);
        e.currentTarget.blur();
      }}
      className={` ${
        isEspecialKeycap ? "keycap_special" : "keycap_normal"
      } h-[51.05px] rounded-[5px] flex  justify-center items-center   dark:bg-blue-keycap-bg dark:text-white outline-none ${
        keyCapStatus
          ? `${keyCapStatus} text-white`
          : "bg-gray-keycap-bg text-gray-keycap-text"
      }`}
    >
      <span>{keycap}</span>
    </button>
  );
};
