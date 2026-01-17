import { AuthProviderProps } from "@/type/type";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface AuthContextType {
  isUser: boolean;
  setIsUser: Dispatch<SetStateAction<true | false>>;
  isGuest: boolean;
  setIsGuest: Dispatch<SetStateAction<true | false>>;
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<true | false>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isUser, setIsUser] = useState(false);
  const [isGuest, setIsGuest] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const values: AuthContextType = {
    isUser,
    setIsUser,
    isGuest,
    setIsGuest,
    isAdmin,
    setIsAdmin,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
