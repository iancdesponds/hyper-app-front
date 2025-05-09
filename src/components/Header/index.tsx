import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../../contexts/AuthContext";
import { StyledHeader } from "./styles";

export default function Header() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();                     // limpa o token no contexto
    Cookies.remove("session_token"); // garante remoção do cookie
    navigate("/register", { replace: true });
  };

  return (
    <StyledHeader>
      <div className="headerContent">
        {/* Logo com 60px de altura */}
        <img
          src="/logo.png"
          alt="Logo"
          className="logo"
          style={{ height: "60px" }}
        />
        <p>Hyper App</p>
        {/* Botão de logout */}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </StyledHeader>
  );
}