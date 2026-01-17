import { Colors } from "@/constants/Colors";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ThemeProviderProps {
  children: ReactNode;
}

export interface ThemeContextType {
  colorScheme: "light" | "dark";
  setColorScheme: Dispatch<SetStateAction<"light" | "dark">>;
  theme: typeof Colors.light | typeof Colors.dark;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface ITheme {
  text: string;
  bg: string;
  primary: string;
}

export interface IProducts {
  id: number;
  title: string;
  description: string;
  gender: string;
  price: number;
  salePrice: number;
  image: string[];
  categoryId: number;
  subCategoryId: number;
  stock: string;
  totalSold: number;
  sizes: string;
  colors: string;
  deliveryCharge: number;
  flash: string;
  featured: boolean;
  isAvailable: boolean;
  brand: string;
  material: string;
  rating: number;
  tags: string;
  createdAt: Date;
}

export interface IAnnounce {
  id: number;
  title: string;
  description: string;
}
