import { useEffect, useState } from "react";

export const CountUp = ({ value, duration = 800 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value) || 0;

    if (start === end) return;

    const incrementTime = 20;
    const steps = duration / incrementTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
};