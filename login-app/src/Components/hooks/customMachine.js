import { useState, useEffect } from 'react';

function useTimeRecorder() {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0); //경과시간

  const handleStart = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };


  const handleStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
  };

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      setStartTime(Date.now() - elapsedTime);
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, elapsedTime, startTime]);


  return { isRunning, elapsedTime, handleStart, handleStop, resetTimer }
}

export default useTimeRecorder;
