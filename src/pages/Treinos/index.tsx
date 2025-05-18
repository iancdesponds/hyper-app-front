import {
  History,
  LogOut,
  ClipboardList,
  Dumbbell,
  Settings,
  User,
  Clock,
} from "lucide-react";
import { StyledHome, Sidebar, Content } from "./styles";
import { useNavigate, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface Exercicios {
  exercise_name: string;
  reps: number;
  weight: number;
  rest: number;
}

interface Treino {
  name: string;
  expected_duration: number;
  exercises: Exercicios[];
}

type TreinoData = Record<string, Treino>;

export default function Treinos() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [treinos, setTreinos] = useState<TreinoData>({});
  const [weekRange, setWeekRange] = useState("");

  useEffect(() => {
    const now = new Date();
    const monday = new Date(now.setDate(now.getDate() - now.getDay() + 1));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const formatDate = (d: Date) =>
      d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });

    setWeekRange(`Semana ${monday.getDate()} – ${formatDate(sunday)}`);

    async function fetchTreinos() {
      try {
        const response = await fetch("http://localhost:8003/treino", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Erro ao buscar treinos");

        const data: TreinoData = await response.json();
        setTreinos(data);
        localStorage.setItem("weekTreinos", JSON.stringify(data));
      } catch (error) {
        console.error("Erro ao carregar treinos:", error);
      }
    }

    fetchTreinos();
  }, []);

  const diasSemana: Record<string, string> = {
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado",
    sunday: "Domingo",
  };

  return (
    <StyledHome>
      <Sidebar>
        <div className="brand">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1>HYPER APP</h1>
        </div>

        <nav>
          <ul>
            <li>
              <NavLink
                to="/treinos"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <ClipboardList size={20} /> Treinos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/historico"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <History size={20} /> Histórico
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/exercicios"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <Dumbbell size={20} /> Exercícios
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/perfil"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <User size={20} /> Perfil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/configuracoes"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <Settings size={20} /> Configurações
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="bottom-section">
          <div className="profile-placeholder" />
          <p>iancdesponds</p>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <LogOut size={20} />
          </button>
        </div>
      </Sidebar>

      <Content>
        <h1>Meus Treinos</h1>
        <h2>{weekRange}</h2>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginTop: "2rem",
          }}
        >
          {Object.entries(treinos).map(([key, treino]) => {
            if (!treino || !treino.exercises) return null; // proteção extra

            const nomeDia = diasSemana[key] || key;

            return (
              <div
                key={key}
                style={{
                  border: "1px solid #333",
                  borderRadius: "8px",
                  padding: "1rem",
                  width: "300px",
                  backgroundColor: "#1a1a1a",
                }}
              >
                <p style={{ color: "#aaa", marginBottom: "0.5rem" }}>
                  {nomeDia}
                </p>
                <h3 style={{ margin: 0 }}>{treino.name}</h3>
                <p style={{ margin: "0.5rem 0" }}>
                  {treino.exercises.length} séries
                </p>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#ccc",
                  }}
                >
                  <Clock size={16} /> Tempo estimado: {treino.expected_duration}{" "}
                  min
                </p>
                <button
                  style={{ marginTop: "1rem", width: "100%" }}
                  onClick={() => {
                    localStorage.setItem(
                      "currentTreino",
                      JSON.stringify(treino)
                    );
                    navigate(`/treino/${key}`);
                  }}
                >
                  Iniciar Treino
                </button>
              </div>
            );
          })}
        </div>
      </Content>
    </StyledHome>
  );
}
