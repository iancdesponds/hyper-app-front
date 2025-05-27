// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

/* ------------------------------------------------------------------ */
/* Tipagem do payload completo do backend                             */
/* ------------------------------------------------------------------ */
export interface RegisterFullData {
  first_name: string;
  last_name: string;
  cpf: string;
  birth_date: string;           // ISO
  email: string;
  phone_number: string;
  password: string;

  personal_info: {
    weight_kg: number;
    height_cm: number;
    bio_gender: "M" | "F" | "O";
    training_since: string;
  };

  training_availability: {
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
  };

  /* chaves dinâmicas: enviamos apenas as que forem true */
  condition: Record<string, boolean>;
}

/** Estrutura do objeto usuário que vem do endpoint /auth/me */
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  // outros campos, se houver
}

/* ------------------------------------------------------------------ */
/* Interface exposta ao resto do app                                  */
/* ------------------------------------------------------------------ */
interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  registerFull: (data: RegisterFullData) => Promise<void>;
  /** retorna "First Last" ou null */
  getFullName: () => string | null;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: async () => {},
  logout: () => {},
  registerFull: async () => {},
  getFullName: () => null,
});

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Ao montar, lê o token do cookie e carrega o perfil
  useEffect(() => {
    const t = Cookies.get("session_token");
    if (t) {
      setToken(t);
      fetchProfile(t);
    }
  }, []);

  // Busca os dados do usuário logado
  const fetchProfile = async (bearerToken: string) => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${bearerToken}` },
      });
      if (resp.ok) {
        const data = (await resp.json()) as User;
        setUser(data);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  };

  // Faz login e carrega token + perfil
  const login = async (email: string, password: string) => {
    const body = new URLSearchParams();
    body.append("username", email);
    body.append("password", password);

    const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.detail || "Falha no login");
    }

    const { access_token } = (await resp.json()) as { access_token: string };
    Cookies.set("session_token", access_token, { expires: 1 }); // expira em 1 dia
    setToken(access_token);
    await fetchProfile(access_token);
  };

  // Registro completo de usuário
  const registerFull = async (data: RegisterFullData) => {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const payload = await resp.json();
    if (!resp.ok) {
      console.error("🔥 registerFull payload:", payload);
      throw new Error(payload.detail ?? JSON.stringify(payload));
    }
    return payload;
  };

  // Logout e limpeza de estado
  const logout = () => {
    Cookies.remove("session_token");
    setToken(null);
    setUser(null);
  };

  // Retorna "First Last" se user existir
  const getFullName = (): string | null => {
    return user ? `${user.first_name} ${user.last_name}` : null;
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, registerFull, getFullName }}
    >
      {children}
    </AuthContext.Provider>
  );
};
