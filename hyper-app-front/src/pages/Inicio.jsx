import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Inicio() {
  const location = useLocation();
  const navigate = useNavigate();

  const cpf = location.state?.cpf;
  const nome = location.state?.nome;

  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    console.log("location.state recebido:", location.state); // 👈 DEBUG
    if (!cpf || !nome) {
      setMensagem("Informações incompletas. Redirecionando...");
      setTimeout(() => navigate("/"), 2000);
    } else {
      setMensagem(`Bem-vindo(a), ${nome}!`);
    }
  }, [cpf, nome, navigate]);

  return (
    <div style={{
      backgroundColor: "#000",
      color: "#fff",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.5rem",
      textAlign: "center",
      padding: "20px"
    }}>
      {mensagem || "Carregando..."}
    </div>
  );
}

export default Inicio;
