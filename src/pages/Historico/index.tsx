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

export default function Historico() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
        <h1>Meu Histórico</h1>
        {/* Aqui você pode colocar os cards como no Hevy */}
      </Content>
    </StyledHome>
  );
}
