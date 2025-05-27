// src/contexts/AuthContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username?: string; // se o backend expuser
}

interface AuthContextType {
  token: string | null;
  user: UserData | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  registerFull: (data: any) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: async () => {},
  logout: () => {},
  registerFull: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  // Ao montar, lê o token do cookie
  useEffect(() => {
    const t = Cookies.get("session_token");
    if (t) setToken(t);
  }, []);

  // Sempre que mudar o token, busca /auth/me
  useEffect(() => {
    async function fetchUser() {
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Falha ao buscar usuário");
        }
        const u: UserData = await res.json();
        setUser(u);
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
        setUser(null);
      }
    }
    fetchUser();
  }, [token]);

  // Função de login
  const login = async (email: string, password: string) => {
    const body = new URLSearchParams();
    body.append("username", email);
    body.append("password", password);

    const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.detail || "Falha no login");
    }

    const { access_token } = (await resp.json()) as { access_token: string };
    // Salva cookie e estado
    Cookies.set("session_token", access_token, { expires: 1 });
    setToken(access_token);
  };

  // Função de registro completo (mantém sua implementação atual)
  const registerFull = async (data: any) => {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const payload = await resp.json();
    if (!resp.ok) {
      console.error("Erro no registerFull:", payload);
      throw new Error(payload.detail ?? JSON.stringify(payload));
    }
    return payload;
  };

  // Função de logout
  const logout = () => {
    Cookies.remove("session_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, registerFull }}
    >
      {children}
    </AuthContext.Provider>
  );
};
