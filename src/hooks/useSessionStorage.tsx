import { useEffect, useState } from "react";

export function useSessionStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<typeof initialValue>(() => {
    if (typeof window !== "undefined")
      return JSON.parse(sessionStorage.getItem(key)!) ?? initialValue;

    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return { value, setValue };
}
