import { intervalToDuration } from "date-fns";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "usd",
  }).format(value || 0);
}

export function parseISODuration(duration: string) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);

  if (!match) {
    throw new Error("Invalid ISO 8601 duration format");
  }

  const minutes = match[2] ? `${parseInt(match[2], 10)}m` : "";
  const hours = match[1] ? `${parseInt(match[1], 10)}h` : "";

  return { hours, minutes };
}

export function dateIntervalToDuration({
  start,
  end,
}: {
  start: Date;
  end: Date;
}) {
  const interval = intervalToDuration({
    start,
    end,
  });
  return {
    hours: interval.hours ? `${interval.hours}h` : "",
    minutes: interval.minutes ? `${interval.minutes}m` : "",
  };
}
