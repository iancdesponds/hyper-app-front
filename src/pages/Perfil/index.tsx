import {
  History,
  LogOut,
  ClipboardList,
  Dumbbell,
  Settings,
  User,
} from "lucide-react";
import { StyledHome, Sidebar, Content } from "./styles";
import { useNavigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { DashboardCard } from "../../components/Perfil/DashBoardCard";
import { DashboardGrid } from "../../components/Perfil/DashBoardGrid";
import { DataPoint, WeightChartCard } from "../../components/Perfil/WeightChartCard";
export default function Perfil() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const weightData: DataPoint[] = [
       { date: '2025-05-01', weight: 73.2 },
       { date: '2025-05-03', weight: 72.8 },
       { date: '2025-05-05', weight: 72.5 },
       { date: '2025-05-07', weight: 72.3 },
     ];


  const forecastData: DataPoint[] = [
        { date: '2025-05-09', weight: 72.0 },
         { date: '2025-05-11', weight: 71.8 },
         { date: '2025-05-13', weight: 71.5 },
         { date: '2025-06-13', weight: 61.5 },
         { date: '2025-06-15', weight: 40.5 },
       ];
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
        <h1>Meu Perfil</h1>
        <DashboardGrid>
          <DashboardCard title="Treinos Concluídos" value="128" />
          <DashboardCard title="Sessões Restantes" value="03" />
          <DashboardCard title="Calorias Queimadas" value="5.432" />
          <DashboardCard title="Peso Atual" value="72 kg" />
          <DashboardCard title="Meta Semanal" value="+1 kg" />
          <DashboardCard title="Próximo Treino" value="Seg · 18:00" />
        </DashboardGrid>
        <WeightChartCard data={weightData} forecastData={forecastData}/>
      </Content>
    </StyledHome>
  );
}
