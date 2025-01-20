import { useEffect, useState } from "react";

export function useDebounceTerm(query: string, time: number) {
  const [debouncedTerm, setDebouncedTerm] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(query);
    }, time);

    return () => clearInterval(timeoutId);
  }, [query, time]);

  return debouncedTerm;
}
