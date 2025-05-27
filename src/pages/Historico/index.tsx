// src/pages/Historico.tsx

import React, { useContext, useEffect, useState } from "react";
import { styled } from "@stitches/react";
import {
  History as HistoryIcon,
  LogOut,
  ClipboardList,
  Dumbbell,
  Settings,
  User,
} from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Sidebar from "../../components/Sidebar";

interface APIResponse {
  Complete?: Record<string, {
    Name: string;
    Expected_duration: number;
    Exercises: {
      exercise_name: string;
      reps: number[];
      weight: number[];
      rest: number[];
    }[];
  }>;
  Incomplete?: Record<string, {
    Name: string;
    Expected_duration: number;
    Exercises: {
      exercise_name: string;
      reps: number[];
      weight: number[];
      rest: number[];
    }[];
  }>;
}

interface TreinoHist {
  id: string;
  name: string;
  duration: number;
  exercises: {
    exercise_name: string;
    reps: number[];
    weight: number[];
    rest: number[];
  }[];
  completed: boolean;
}

const StyledHome = styled("div", {
  display: "flex",
  width: "100vw",
  height: "100vh",
  backgroundColor: "#121212",
});

const Content = styled("main", {
  flex: 1,
  padding: "2rem",
  overflowY: "auto",
  backgroundColor: "#121212",
  color: "#ffffff",

  ".history-container": {
    marginTop: "2rem",
  },

  ".history-header": {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
    padding: "0.6rem 1rem",
    backgroundColor: "#1f1f1f",
    borderRadius: "6px",
    fontWeight: "600",
    fontSize: "0.95rem",
    color: "#ccc",
    textAlign: "center",
    position: "sticky",
    top: 0,
    zIndex: 2,
  },

  ".history-scroll": {
    maxHeight: "60vh",
    overflowY: "auto",
    marginTop: "0.5rem",
  },

  ".history-row": {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: "0.8rem 1rem",
    borderRadius: "6px",
    color: "#eee",
    fontSize: "0.9rem",
    gap: "0.5rem",
    textAlign: "center",
    marginBottom: "0.4rem",

    "& button": {
      backgroundColor: "#2c2c2c",
      border: "none",
      padding: "0.3rem 0.6rem",
      borderRadius: "4px",
      cursor: "pointer",
      color: "#fff",
      transition: "background 0.2s",
      "&:hover": { backgroundColor: "#3d3d3d" },
    },
  },

  ".modal-overlay": {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  ".modal-treino": {
    width: "90%",
    maxWidth: "600px",
    maxHeight: "80vh",
    backgroundColor: "#1f1f1f",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
    padding: "1.5rem",
    color: "#fff",
    position: "relative",
    display: "flex",
    flexDirection: "column",

    "& h2": {
      margin: 0,
      marginBottom: "1rem",
      fontSize: "1.5rem",
      fontWeight: 600,
    },

    "& p": {
      margin: "0.5rem 0",
    },

    "& ul": {
      listStyle: "none",
      padding: 0,
      margin: "1rem 0 0 0",
      overflowY: "auto",
      flex: 1,

      "& li": {
        marginBottom: "1rem",
        paddingBottom: "1rem",
        borderBottom: "1px solid #333",

        "& strong": {
          display: "block",
          fontSize: "1.1rem",
        },

        "& span": {
          display: "block",
          marginTop: "0.25rem",
          fontSize: "0.9rem",
          color: "#ccc",
        },
      },
    },

    ".close-btn": {
      position: "absolute",
      top: "0.75rem",
      right: "0.75rem",
      background: "none",
      border: "none",
      color: "#fff",
      fontSize: "1.25rem",
      cursor: "pointer",
    },
  },
});

export default function Historico() {
  const { token } = useContext(AuthContext);
  const [historyData, setHistoryData] = useState<TreinoHist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<TreinoHist | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("http://localhost:8003/treino/all", {
          credentials: "include",
          headers: {
            Accept: "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: APIResponse = await res.json();

        const completeArr: TreinoHist[] = Object.entries(json.Complete || {}).map(
          ([id, rec]) => ({
            id,
            name: rec.Name,
            duration: rec.Expected_duration,
            exercises: rec.Exercises,
            completed: true,
          })
        );
        const incompleteArr: TreinoHist[] = Object.entries(json.Incomplete || {}).map(
          ([id, rec]) => ({
            id,
            name: rec.Name,
            duration: rec.Expected_duration,
            exercises: rec.Exercises,
            completed: false,
          })
        );
        const all = [...completeArr, ...incompleteArr].sort(
          (a, b) => parseInt(b.id) - parseInt(a.id)
        );
        setHistoryData(all);
      } catch (err: any) {
        console.error("Erro ao buscar histórico:", err);
        setError(err.message);
      }
    }
    fetchHistory();
  }, [token]);

  return (
    <StyledHome>
      <Sidebar />
      <Content>
        <h1>Meu Histórico</h1>

        {error && (
          <p style={{ color: "tomato", marginBottom: "1rem" }}>
            Erro ao carregar histórico: {error}
          </p>
        )}

        <div className="history-container">
          <div className="history-header">
            <span>Nome</span>
            <span>Exercícios</span>
            <span>Duração</span>
            <span>Status</span>
            <span>Ações</span>
          </div>

          <div className="history-scroll">
            {historyData.length === 0 && !error && (
              <p>Carregando histórico ou nenhum registro encontrado...</p>
            )}
            {historyData.map((rec) => (
              <div className="history-row" key={rec.id}>
                <span>{rec.name}</span>
                <span>{rec.exercises.length}</span>
                <span>{rec.duration} min</span>
                <span>{rec.completed ? "Concluído" : "Pendente"}</span>
                <button
                  className="treino-button"
                  onClick={() => setSelected(rec)}
                >
                  Visualizar
                </button>
              </div>
            ))}
          </div>
        </div>

        {selected && (
          <div className="modal-overlay">
            <div className="modal-treino">
              <button className="close-btn" onClick={() => setSelected(null)}>
                X
              </button>
              <h2>
                {selected.name} ({selected.completed ? "Concluído" : "Pendente"})
              </h2>
              <p><strong>Duração esperada:</strong> {selected.duration} min</p>
              <h3>Exercícios:</h3>
              <ul>
                {selected.exercises.map((ex, i) => (
                  <li key={i}>
                    <strong>{ex.exercise_name}</strong>
                    <span>Séries: {ex.reps.length}</span>
                    <span>Reps: [{ex.reps.join(", ")}]</span>
                    <span>Peso: [{ex.weight.join(", ")}] kg</span>
                    <span>Descanso: [{ex.rest.join(", ")}] s</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Content>
    </StyledHome>
  );
}
