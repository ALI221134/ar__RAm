"use client";

import { useEffect, useState } from 'react';

interface StatsCounterProps {
  end: number;
  duration?: number;
  delay?: number;
}

export default function StatsCounter({ end, duration = 2000, delay = 0 }: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [hasStarted, end, duration]);

  return (
    <span className="inline-block">
      {count.toLocaleString('fa-IR')}
    </span>
  );
}