import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const formatarCpf = (valor) => {
  valor = valor.replace(/\D/g, "").slice(0, 11);
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return valor;
};

const emailValido = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


const problemasComuns = [
  "Diabetes", "Hipertensão", "Asma", "Cardiopatia", "Obesidade",
  "Doença renal", "Colesterol alto", "Problemas na coluna",
  "Artrite", "Artrose", "Enxaqueca", "Problemas respiratórios",
  "Problemas cardíacos", "Câncer", "Alergias graves", "Problemas hepáticos",
  "Anemia", "Doença autoimune", "Epilepsia", "Transtornos mentais"
];

function Cadastro() {
  const location = useLocation();
  const cpf = location.state?.cpf || "";

  const [problemaSaude, setProblemaSaude] = useState("não");
  const [problemasSelecionados, setProblemasSelecionados] = useState([]);
  const [outroProblema, setOutroProblema] = useState("");

  const handleCheckboxChange = (problema) => {
    setProblemasSelecionados((prev) =>
      prev.includes(problema)
        ? prev.filter((p) => p !== problema)
        : [...prev, problema]
    );
  };

  const navigate = useNavigate();

const [nome, setNome] = useState("");
const [sobrenome, setSobrenome] = useState("");
const [email, setEmail] = useState("");
const [dataNascimento, setDataNascimento] = useState("");
const [genero, setGenero] = useState("");
const [tempoAcademia, setTempoAcademia] = useState("");

const handleContinue = () => {
  if (
    nome.trim() === "" ||
    sobrenome.trim() === "" ||
    email.trim() === "" ||
    dataNascimento.trim() === "" ||
    genero === "" ||
    tempoAcademia === "" ||
    cpf.trim() === ""
  ) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  if (!emailValido(email)) {
    alert("Por favor, insira um e-mail válido.");
    return;
  }

  if (problemaSaude === "sim" && problemasSelecionados.length === 0 && outroProblema.trim() === "") {
    alert("Selecione ou descreva pelo menos um problema de saúde.");
    return;
  }

  navigate("/inicio", { state: { cpf, nome } });
};


  return (
    <div
      style={{
        backgroundColor: "#FF9933",
        backgroundImage: 'url("/logo.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '600px',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay',
        opacity: 100,
        minHeight: "100vh",
        color: "WHITE",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Cabeçalho fixo */}
      <div style={{
        position: "sticky",
        top: 0,
        backgroundColor: "#FF9933",
        padding: "20px 0",
        textAlign: "center",
        zIndex: 10
      }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>Cadastro</h1>
      </div>

      {/* Área scrollável */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        display: "flex",
        justifyContent: "center"
      }}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "300px",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            padding: "20px",
            borderRadius: "12px"
          }}
        >
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="input"
          />

          <input
            type="text"
            placeholder="Sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            className="input"
          />


          <input
            type="text"
            value={formatarCpf(cpf)}
            disabled
            className="input"
          />


          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />

          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="input"
          />

          <select
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            className="input"
          >
            <option value="">Selecione o Gênero</option>
            <option>Masculino</option>
            <option>Feminino</option>
            <option>Outro</option>
            <option>Prefiro não responder</option>
          </select>

          <select
            value={tempoAcademia}
            onChange={(e) => setTempoAcademia(e.target.value)}
            className="input"
          >
            <option value="">Tempo de academia</option>
            <option>Nunca fiz</option>
            <option>1-6 meses</option>
            <option>6-12 meses</option>
            <option>1 a 3 anos</option>
            <option>3 a 5 anos</option>
            <option>5 a 10 anos</option>
            <option>10+ anos</option>
          </select>


          <label style={{ color: "#fff" }}>Problema prévio de saúde?</label>
          <select
            className="input"
            onChange={(e) => setProblemaSaude(e.target.value)}
          >
            <option>não</option>
            <option>sim</option>
          </select>

          {problemaSaude === "sim" && (
            <div style={{
              maxHeight: "200px",
              overflowY: "auto",
              background: "#fff1",
              padding: "10px",
              borderRadius: "8px"
            }}>
              {problemasComuns.map((problema) => (
                <label key={problema} style={{ display: "block", marginBottom: "5px", color: "#fff" }}>
                  <input
                    type="checkbox"
                    value={problema}
                    checked={problemasSelecionados.includes(problema)}
                    onChange={() => handleCheckboxChange(problema)}
                    style={{ marginRight: "8px" }}
                  />
                  {problema}
                </label>
              ))}
              <label style={{ display: "block", marginTop: "10px" }}>
                Outro:
                <input
                  type="text"
                  placeholder="Descreva outro problema"
                  className="input"
                  value={outroProblema}
                  onChange={(e) => setOutroProblema(e.target.value)}
                />
              </label>
            </div>
          )}

          <button
            type="button"
            onClick={handleContinue}
            style={{
              backgroundColor: "#1E90FF",
              color: "#fff",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            Enviar
          </button>
        </form>
      </div>

      {/* Estilo global inline para inputs */}
      <style>
        {`
          .input {
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #fff;
            background-color: #111;
            color: #fff;
            width: 100%;
            box-sizing: border-box;
          }

          .input::placeholder {
            color: #ccc;
          }

          select.input {
            background-color: #111;
          }
        `}
      </style>
    </div>
  );
}

export default Cadastro;
