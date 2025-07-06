"use client";

import { useEffect, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";

export function formatRelativeDate(from: Date) {
  const currentDate = new Date();
  const difference = currentDate.getTime() - from.getTime();

  if (difference < 0) {
    // If somehow date is in the future
    return "just now";
  }

  if (difference < 24 * 60 * 60 * 1000) {
    return formatDistanceToNow(from, { addSuffix: true });
  } else if (currentDate.getFullYear() === from.getFullYear()) {
    return format(from, "MMM d");
  } else {
    return format(from, "MMM d, yyyy");
  }
}

export function useRelativeTime(date: Date, intervalMs = 60 * 1000) {
  const [relativeTime, setRelativeTime] = useState(() => formatRelativeDate(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeTime(formatRelativeDate(date));
    }, intervalMs);

    return () => clearInterval(interval);
  }, [date, intervalMs]);

  return relativeTime;
}
