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
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  // adicione outros campos se precisar
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


/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */
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
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  /* recupera token salvo em cookie ao recarregar */
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
        // se token expirou ou inválido
        logout();
      }
    } catch {
      logout();
    }
  };

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
    Cookies.set("session_token", access_token, { expires: 1 }); // 1 dia
    setToken(access_token);

    // carrega o usuário imediatamente
    await fetchProfile(access_token);
  };

  /* ----------------------- REGISTER ------------------------- */

  const registerFull = async (data: RegisterFullData) => {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const payload = await resp.json();
    if (!resp.ok) {
      console.error("🔥 Enviado:", data);
      console.error("🔥 Erro:", payload);
      throw new Error(payload.detail ?? JSON.stringify(payload));
    }
    return payload;
  };

  const logout = () => {
    Cookies.remove("session_token");
    setToken(null);
    setUser(null);
  };

  const getFullName = (): string | null => {
    if (!user) return null;
    return `${user.first_name} ${user.last_name}`;
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, registerFull, getFullName }}
    >
      {children}
    </AuthContext.Provider>
  );
};
