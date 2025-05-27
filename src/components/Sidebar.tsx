// src/components/Sidebar.tsx
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ClipboardList, History, User, LogOut } from "lucide-react";
import { SidebarWrapper, ToggleButton } from "./SidebarStyles";

export default function Sidebar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarWrapper collapsed={collapsed}>
      <ToggleButton onClick={() => setCollapsed((c) => !c)}>
        <span />
        <span />
        <span />
      </ToggleButton>

      <div className="brand">
        {!collapsed && (
          <>
            <img src="./logo.png" alt="Logo" className="logo" />
            <h1>HYPER APP</h1>
          </>
        )}
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/treinos" className={({ isActive }) => isActive ? "active" : ""}>
              <ClipboardList size={24} />
              {!collapsed && "Treinos"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/historico" className={({ isActive }) => isActive ? "active" : ""}>
              <History size={24} />
              {!collapsed && "Histórico"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/perfil" className={({ isActive }) => isActive ? "active" : ""}>
              <User size={24} />
              {!collapsed && "Perfil"}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="bottom-section">
        <div className="profile-placeholder" />
        {!collapsed && (
          <p className="username">
            {user?.first_name ?? user?.username ?? "Usuário"}
          </p>
        )}
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <LogOut size={20} />
        </button>
      </div>
    </SidebarWrapper>
  );
}
