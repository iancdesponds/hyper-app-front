import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PublicRoute } from "./components/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Treinos from "./pages/Treinos";
import ExecutarTreino from "./pages/ExecutarTreino";
import Historico from "./pages/Historico";
import Exercicios from "./pages/Exercicios";
import Perfil from "./pages/Perfil";
import Configuracoes from "./pages/Configuracoes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/treinos"
            element={
              <PrivateRoute>
                <Treinos />
              </PrivateRoute>
            }
          />
          <Route
            path="/historico"
            element={
              <PrivateRoute>
                <Historico />
              </PrivateRoute>
            }
          />
          <Route
            path="/exercicios"
            element={
              <PrivateRoute>
                <Exercicios />
              </PrivateRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Perfil />
              </PrivateRoute>
            }
          />
          <Route
            path="/configuracoes"
            element={
              <PrivateRoute>
                <Configuracoes />
              </PrivateRoute>
            }
          />

          <Route
            path="/treino/:id"
            element={
              <PrivateRoute>
                <ExecutarTreino />
              </PrivateRoute>
            }
          />

          {/* Redireciona "/" para "/treinos" */}
          <Route path="/" element={<Navigate to="/treinos" replace />} />

          {/* Redireciona qualquer rota inexistente para "/treinos" */}
          <Route path="*" element={<Navigate to="/treinos" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
