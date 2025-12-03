import React, { createContext, useCallback, useState, useEffect } from "react";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("auth-user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(({ email }) => {
    const fakeUser = { name: "Prathmesh", email };
    setUser(fakeUser);
    localStorage.setItem("auth-user", JSON.stringify(fakeUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth-user");
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("auth-user", JSON.stringify(user));
    else localStorage.removeItem("auth-user");
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
