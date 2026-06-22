import { createContext, useState } from "react";

export const ThemeContext = createContext(); //Box created.

export function ThemeProvider({ children }) { //Render whatever is wrapped inside me.
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : "light"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}