import { useState, useEffect } from 'react';

function useTimeRecorder() {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  // const [elapsedTime, setElapsedTime] = useState(0); // 경과시간

  // 가동 시간 localstorage 
  const [elapsedTime, setElapsedTime] = useState(() => {
    return JSON.parse(localStorage.getItem('elapsedTime')) || 0;
  })

  useEffect(() => {
    localStorage.setItem('elapsedTime', JSON.stringify(elapsedTime));
  }, [elapsedTime])
//  ------------------

  const handleStart = () => {
    if (!isRunning) {
      const start = Date.now() - elapsedTime;
      setStartTime(start);
      localStorage.setItem('startTime', start.toString());
      setIsRunning(true);
      localStorage.setItem('isRunning', 'true');
    }
  };

  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
      localStorage.setItem('isRunning', 'false');
    }
  };

  const restartTimer = () => {
    handleStart();
  };

  const resetTimer = () => {
    // setIsRunning(false);
    // setStartTime(null);
    // setElapsedTime(0);

    setIsRunning(false);
    localStorage.setItem('isRunning', 'false');
    setStartTime(null);
    localStorage.removeItem('startTime');
    setElapsedTime(0);
  };

  // useEffect(() => {
  //   let intervalId;
  //   if (isRunning) {
  //     intervalId = setInterval(() => {
  //       setElapsedTime(Date.now() - startTime);
  //     }, 1000);
  //   } else {
  //     clearInterval(intervalId);
  //   }
  //   return () => clearInterval(intervalId);
  // }, [isRunning, startTime]);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        const localStartTime = Number(localStorage.getItem('startTime') || startTime);
        setElapsedTime(Date.now() - localStartTime);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, startTime]);
  

  // 저장된 시작 시간
  useEffect(() => {
    const localIsRunning = localStorage.getItem('isRunning') === 'true';
    const localStartTime = localStorage.getItem('startTime');

    if (localIsRunning && localStartTime) {
      setStartTime(Number(localStartTime));
      setIsRunning(true);
    }
  }, [])

  return { isRunning, elapsedTime, handleStart, handleStop, restartTimer, resetTimer };
}

export default useTimeRecorder;
