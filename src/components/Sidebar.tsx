import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  ClipboardList,
  Dumbbell,
  History,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { SidebarWrapper } from "./SidebarStyles";

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <SidebarWrapper>
      <div className="brand">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>HYPER APP</h1>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/treinos" className={({ isActive }) => (isActive ? "active" : "")}>
              <ClipboardList size={30} /> Treinos
            </NavLink>
          </li>
          <li>
            <NavLink to="/historico" className={({ isActive }) => (isActive ? "active" : "")}>
              <History size={30} /> Histórico
            </NavLink>
          </li>
          <li>
            <NavLink to="/perfil" className={({ isActive }) => (isActive ? "active" : "")}>
              <User size={30} /> Perfil
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="bottom-section">
        <div className="profile-placeholder" />
        <p style={{ color: "#555", marginLeft: "10px" }}>iancdesponds</p>
        <button onClick={() => { logout(); navigate("/login"); }}>
          <LogOut size={20} />
        </button>
      </div>
    </SidebarWrapper>
  );
}
