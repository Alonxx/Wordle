import React from "react";

export const useCreateTimeToNewWord = (
  getNewWord: () => void,
  userTimeStamp: number
) => {
  const [currentTimeStamp, setCurrentTimeStamp] =
    React.useState<number>(userTimeStamp);
  const [isTimeOut, setIsTimeOut] = React.useState<boolean>(true);
  const [currentTimer, setCurrentTimer] = React.useState<NodeJS.Timeout>();
  const milisecondsToNewWord = 300000;

  React.useEffect(() => {
    if (isTimeOut) {
      setIsTimeOut(false);
      const timeToNewWord = timeLeft();
      setCurrentTimer(setTimer(timeToNewWord));
    }
    return () => clearTimeout(currentTimer);
  }, [isTimeOut]);

  const setTimer = (timeToNewWord: number) =>
    setTimeout(() => {
      newWord();
    }, timeToNewWord);

  const newWord = () => {
    getNewWord();
    setCurrentTimeStamp(new Date().getTime() + milisecondsToNewWord);
    setIsTimeOut(true);
  };

  const timeLeft = () => {
    const currentTime = new Date().getTime();
    const miliseconds = currentTimeStamp - currentTime;
    return miliseconds < 0 ? 0 : miliseconds;
  };

  return { currentTimeStamp };
};
