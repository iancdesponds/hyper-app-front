import {
  History,
  LogOut,
  ClipboardList,
  Dumbbell,
  Settings,
  User,
} from "lucide-react";
import {
  StyledHome,
  Sidebar,
  Content,
  TreinoGrid,
  TreinoCard,
  GridHorizontal,
} from "./styles";
import { useNavigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import NewTreinoButton from "../../components/Treino/NewTreinoButton";
import { SectionTitle } from "../../components/Treino/SectionTitle";
import TreinoWizard from "../../components/Treino/TreinoWizard";
import { useState } from "react";
export interface Treino {
  id: number;
  nome: string;
  descricao: string;
  exercicios: string[];
}

export const treinosExemplo: Treino[] = [
  {
    id: 1,
    nome: "Full Body Iniciante",
    descricao: "Treino equilibrado para quem está começando, trabalhando todos os grupos musculares.",
    exercicios: ["Agachamento", "Flexão de braço", "Remada curvada"]
  },
  {
    id: 2,
    nome: "Hipertrofia Superior",
    descricao: "Foco em peito, costas e braços para ganho de massa muscular.",
    exercicios: ["Supino reto", "Puxada na barra", "Rosca direta", "Tríceps testa"]
  },
  {
    id: 3,
    nome: "Cardio e Resistência",
    descricao: "Circuito de alta intensidade para melhorar condicionamento.",
    exercicios: ["Corrida estacionária (5 min)", "Burpee (3×15)", "Pular corda (3×1 min)"]
  }
];




export default function Treinos() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // estado com lista + modal
  const [treinos, setTreinos] = useState<Treino[]>(treinosExemplo);
  const [openWizard, setOpenWizard] = useState(false);

  const addTreino = (novo: Treino) => setTreinos((prev) => [...prev, novo]);
  
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

          <p style={{ color: "#555", marginLeft: "10px" }}>iancdesponds</p>

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
        <GridHorizontal>
       

        <SectionTitle>Gestor de Treinos</SectionTitle>
        <NewTreinoButton onClick={() => setOpenWizard(true)} />

        <TreinoGrid>
          {treinos.map((t) => (
            <TreinoCard key={t.id}>
              <h2>{t.nome}</h2>
              <p>{t.descricao}</p>
              <ul>
                {t.exercicios.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
              <button onClick={() => console.log("Ver detalhes", t.id)}>
                Ver detalhes
              </button>
            </TreinoCard>
          ))}
        </TreinoGrid>
        </GridHorizontal>
      </Content>

      {openWizard && (
        <TreinoWizard
          onClose={() => setOpenWizard(false)}
          onFinished={addTreino}
        />
      )}
    </StyledHome>
  );
}
