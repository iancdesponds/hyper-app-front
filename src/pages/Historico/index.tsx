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
import { useState } from "react";
import Sidebar from "../../components/Sidebar";


export default function Historico() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [treinoSelecionado, setTreinoSelecionado] = useState<any | null>(null);

  return (
    <StyledHome>
      <Sidebar />

      <Content>
        <h1>Meu Histórico</h1>

        <div className="history-container">
          <div className="history-header">
            <span>Data</span>
            <span>Tipo</span>
            <span>Duração</span>
            <span>Treino</span>
            <span>Feedback</span>
          </div>

          <div className="history-scroll">
            {[
              {
                id: 1,
                data: "2025-04-25",
                tipo: "Perna",
                inicio: "08:30",
                treino: "bla bla bla",
                fim: "09:15",
                feedback: null,
              },
              {
                id: 2,
                data: "2025-04-20",
                tipo: "Cardio",
                inicio: "10:00",
                fim: "10:45",
                treino: "bla bla bla",
                feedback: "Muito bom",
              },
            ].map((treino) => {
              const start = new Date(`1970-01-01T${treino.inicio}:00`);
              const end = new Date(`1970-01-01T${treino.fim}:00`);
              const duracao = (end.getTime() - start.getTime()) / 60000;

              return (
                <div className="history-row" key={treino.id}>
                  <span>{new Date(treino.data).toLocaleDateString("pt-BR")}</span>
                  <span>{treino.tipo}</span>
                  <span>{duracao} min</span>
                  <button
                    className="treino-button"
                    onClick={() => setTreinoSelecionado(treino)}
                  >
                    Visualizar
                  </button>
                  <button className="feedback-button">
                    {treino.feedback ? "Acessar" : "Avaliar"}
                  </button>
                </div>
              );
            })}
          {treinoSelecionado && (
            <div className="modal-overlay">
              <div className="modal-treino">
                <button className="close-btn" onClick={() => setTreinoSelecionado(null)}>X</button>
                <h2>{treinoSelecionado.tipo} - {new Date(treinoSelecionado.data).toLocaleDateString("pt-BR")}</h2>
                <p><strong>Duração:</strong> {treinoSelecionado.inicio} até {treinoSelecionado.fim}</p>
                <p><strong>Descrição do treino:</strong> {treinoSelecionado.treino}</p>
              </div>
            </div>
          )}
          </div>
        </div>
      </Content>
    </StyledHome>
  );
}
