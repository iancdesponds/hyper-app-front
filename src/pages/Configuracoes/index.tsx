import {
  History,
  LogOut,
  ClipboardList,
  Dumbbell,
  Settings,
  User,
} from "lucide-react";
import { StyledHome, Content } from "./styles";
import { useNavigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Sidebar from "../../components/Sidebar";


export default function Configuracoes() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <StyledHome>
      <Sidebar />


      <Content>
        <h1>Configurações</h1>
        {/* Aqui você pode colocar os cards como no Hevy */}
      </Content>
    </StyledHome>
  );
}
