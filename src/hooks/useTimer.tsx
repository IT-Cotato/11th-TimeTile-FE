import { useEffect, useState } from "react";

export function useTimer(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (!isCounting) return;
    if (seconds <= 0) {
      setIsCounting(false);
      return;
    }

    const timerId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [seconds, isCounting]);

  const startTimer = (seconds: number) => {
    setSeconds(seconds);
    setIsCounting(true);
  };

  const stopTimer = () => setIsCounting(false);

  return { seconds, isCounting, startTimer, stopTimer };
}
