// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'

interface AuthContextType {
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (data: RegisterData) => Promise<void>
}

interface RegisterData {
  first_name: string
  last_name: string
  cpf: string
  birth_date: string   
  email: string
  phone_number: string
  password: string
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
})

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const t = Cookies.get('session_token')
    if (t) {
      setToken(t)
    }
  }, [])

  // Função de login: chama /auth/login, pega o access_token e salva no cookie
  const login = async (email: string, password: string) => {
    const body = new URLSearchParams()
    body.append('username', email)    // o OAuth2PasswordRequestForm espera 'username'
    body.append('password', password)

    const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    if (!resp.ok) {
      const err = await resp.json()
      throw new Error(err.detail || 'Falha no login')
    }

    const data = await resp.json() as { access_token: string; token_type: string }
    Cookies.set('session_token', data.access_token, { expires: 1 }) // 1 dia
    setToken(data.access_token)

  }

  const register = async (data: RegisterData) => {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    // sempre parse o JSON
    const payload = await resp.json();
  
    if (!resp.ok) {
      console.error('🔥 Register payload sent:', data);
      console.error('🔥 Response from server:', payload);
      // levante um erro com a mensagem detalhada
      const msg = (payload.detail ?? JSON.stringify(payload)) as string;
      throw new Error(msg);
    }
  
    return payload;  // objeto UserRead, caso queira usar
  };

  const logout = () => {
    Cookies.remove('session_token')
    setToken(null)
    // axios.defaults.headers.common['Authorization'] = ''
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}
