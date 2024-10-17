// Auth.js
"use client";
import { createContext, useState, useEffect } from "react";

export const User = createContext(null);

const Auth = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return <User.Provider value={{ user, setUser }}>{children}</User.Provider>;
};

export default Auth;
