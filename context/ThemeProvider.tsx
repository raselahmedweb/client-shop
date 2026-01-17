import { Colors } from "@/constants/Colors";
import { ThemeContextType, ThemeProviderProps } from "@/type/type";
import { createContext, useState } from "react";

// Create context with default value and proper typing
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  const values: ThemeContextType = {
    colorScheme,
    setColorScheme,
    theme,
  };
  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};
