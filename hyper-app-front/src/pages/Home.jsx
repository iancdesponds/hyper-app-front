import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [cpf, setCpf] = useState("");
  const navigate = useNavigate();

  // Função para formatar o CPF
  const formatarCpf = (valor) => {
    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");

    // Limita a 11 dígitos
    valor = valor.slice(0, 11);

    // Aplica a máscara
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return valor;
  };

  const handleCpfChange = (e) => {
    const input = e.target.value;
    setCpf(formatarCpf(input));
  };

  const handleContinue = () => {
    const cpfNumeros = cpf.replace(/\D/g, ""); // Remove pontos e traço
    if (cpfNumeros.length !== 11) {
      alert("CPF inválido. Insira um CPF com 11 números.");
      return;
    }
    navigate("/cadastro", { state: { cpf: cpfNumeros } }); // Passa o CPF limpo
  };

  return (
    <div style={{
      backgroundColor: "#FF9933",
      color: "#fff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <img
        src="/logo.png"
        alt="Logo"
        style={{ width: "200px", marginBottom: "40px" }}
      />
      <input
        type="text"
        placeholder="Digite seu CPF"
        value={cpf}
        onChange={handleCpfChange}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #fff",
          backgroundColor: "WHITE",
          color: "BLACK",
          marginBottom: "20px",
          width: "250px",
          textAlign: "center"
        }}
      />
      <button
        onClick={handleContinue}
        style={{
          backgroundColor: "BLACK",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Iniciar
      </button>
    </div>
  );
}

export default Home;
