import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const useCountdown = (targetDate: string) => {
  const countDownDate = dayjs(targetDate);

  const [countDown, setCountDown] = useState(countDownDate.diff(dayjs()));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate.diff(dayjs()));
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time.toString();
  };

  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, formatTime(hours), formatTime(minutes), formatTime(seconds)];
};

export { useCountdown };

