import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  token: string | null;
  login: (fakeToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = Cookies.get('session_token');
    if (t) setToken(t);
  }, []);

  const login = (fakeToken: string) => {
    Cookies.set('session_token', fakeToken, { expires: 1 /* dia */ });
    setToken(fakeToken);
  };

  const logout = () => {
    Cookies.remove('session_token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
