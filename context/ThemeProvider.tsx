import { Colors } from "@/constants/Colors";
import { ThemeContextType, ThemeProviderProps } from "@/type/type";
import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");

  const values: ThemeContextType = {
    colorScheme,
    setColorScheme,
    theme: Colors[colorScheme],
  };
  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};
