"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("movieAppUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = (email, password) => {
    const newUser = { id: Date.now().toString(), email };
    localStorage.setItem("movieAppUser", JSON.stringify(newUser));
    setCurrentUser(newUser);
    return newUser;
  };

  const login = (email, password) => {
    const user = { id: Date.now().toString(), email };
    localStorage.setItem("movieAppUser", JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem("movieAppUser");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
