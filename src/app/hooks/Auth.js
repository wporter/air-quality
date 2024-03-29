"use client";
import { createContext, useState } from "react";

export const User = createContext(null);

const Auth = ({ children }) => {
  const [user, setUser] = useState(null);

  return <User.Provider value={{ user, setUser }}>{children}</User.Provider>;
};

export default Auth;
