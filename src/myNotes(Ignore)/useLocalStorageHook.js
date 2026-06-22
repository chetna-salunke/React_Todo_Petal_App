import { useState, useEffect } from "react";

export function useLocalStorage( key, initialValue)
 {
  const [value, setValue] = useState(() => {
    const saved =
      localStorage.getItem(key); //localStorage - Browser permanent storage. Even after refresh: data remains.

    return saved
      ? JSON.parse(saved)  //Convert string → JavaScript array/object.
      : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  }, [key, value]);

  return [value, setValue];
}