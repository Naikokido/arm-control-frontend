import React, { createContext, useState, ReactNode, useContext } from "react";

interface User {
  email: string;
  role: string;
  username: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    if (email === "robert.guaman@uoh.cl" && password === "1234") {
      setUser({
        email: "robert.guaman@uoh.cl",
        role: "Administrador",
        username: "Robert Guamán",
      });
    } else {
      setUser({ email, role: "Usuario", username: "Default User" });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
