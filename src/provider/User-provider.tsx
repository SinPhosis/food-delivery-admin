"use client";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  email: string | undefined;
  role: string | undefined;
  token: string | undefined;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContextType | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const userData = JSON.parse(storedUser);
      setUser({
        email: userData.email,
        role: userData.role,
        token: storedToken,
      });
    }
    setLoading(false); 
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider
      value={{ email: user?.email, role: user?.role, token: user?.token }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};

export const setUserData = (
  user: { email: string; role: string },
  token: string
) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const clearUserData = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
