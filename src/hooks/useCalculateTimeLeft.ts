import React from "react";

export const useCalculateTimeLeft = (timeStamp: number) => {
  const [timeLeft, setTimeLeft] = React.useState<string>("");

  React.useEffect(() => {
    const timer = setInterval(() => calculateTimeLeft(), 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateTimeLeft = () => {
    const currentTime = new Date().getTime();
    const miliseconds = timeStamp - currentTime;
    const time = new Date(miliseconds);
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const timeBase = "0:00";
    const timeInString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    setTimeLeft((prevState) => (miliseconds <= 0 ? timeBase : timeInString));
  };

  return timeLeft;
};
