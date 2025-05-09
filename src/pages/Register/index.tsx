import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import InputMask from "react-input-mask";
import { StyledRegister } from "./styles";
import { Eye, EyeOff } from 'lucide-react';


type Step1 = {
  username: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
};
type Step2 = {
  firstName: string;
  lastName: string;
  cpf: string;
  weight: string;
  height: string;
  gender: string;
  birthDate: string;
};
type Step3 = {
  experience: string;
  conditions: string[];
  weekdays: string[];
  timePerDay: string;
};

export default function Register() {
  const [step, setStep] = useState(0);
  const [data1, setData1] = useState<Step1>({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [data2, setData2] = useState<Step2>({
    firstName: "",
    lastName: "",
    cpf: "",
    weight: "",
    height: "",
    gender: "",
    birthDate: "",
  });
  const [data3, setData3] = useState<Step3>({
    experience: "",
    conditions: [],
    weekdays: [],
    timePerDay: "",
  });
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const handleSubmit = () => {
    // aqui você mandaria para o backend; por enquanto:
    const fakeToken = btoa(data1.email + ":" + data1.password);
    login(fakeToken);
    nav("/");
  };

  // Determinar largura da barra de progresso com base na etapa atual
  const getProgressWidth = () => {
    if (step === 0) return "0%";
    // 3 passos no total (começando do 1)
    const stepsTotal = 3;
    const currentStep = step - 1; // 0-based para cálculos
    return `${(currentStep / (stepsTotal - 1)) * 100}%`;
  };

  return (
    <StyledRegister>
      <div className="register-container">
        <img src="/logo.png" alt="Logo" className="logo" />
        
        {step > 0 && (
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: getProgressWidth() }}></div>
              <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
              <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
              <div className={`step ${step >= 3 ? "active" : ""}`}>3</div>
            </div>
            <div className="step-labels">
              <span className={step === 1 ? "active" : ""}>Conta</span>
              <span className={step === 2 ? "active" : ""}>Perfil</span>
              <span className={step === 3 ? "active" : ""}>Treino</span>
            </div>
          </div>
        )}

        {step === 0 && (
          <div className="welcome-screen">
            <h1>Bem-vindo ao seu futuro fitness</h1>
            <div className="welcome-buttons">
              <button onClick={next} className="next">Iniciar cadastro</button>
              <Link to="/login" style={{ width: "100%" }}>
                <button className="back">Já tenho conta</button>
              </Link>
            </div>
          </div>
        )}
        
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (data1.password !== data1.confirm) {
                setPasswordMismatch(true);
                return;
              }
              setPasswordMismatch(false);
              next();
            }}
          >
            <h2>Dados de acesso</h2>
            <input
              placeholder="Nome de usuário"
              value={data1.username}
              onChange={(e) =>
                setData1((d) => ({ ...d, username: e.target.value }))
              }
              required
            />
            <InputMask
              mask="(99) 99999-9999"
              value={data1.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData1((d) => ({ ...d, phone: e.target.value }))
              }
            >
              {(inputProps: any) => (
                <input
                  {...inputProps}
                  type="tel"
                  placeholder="Telefone: (xx) xxxxx-xxxx"
                  required
                />
              )}
            </InputMask>
            <input
              type="email"
              placeholder="E-mail"
              value={data1.email}
              onChange={(e) => setData1((d) => ({ ...d, email: e.target.value }))}
              required
            />

            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={data1.password}
                onChange={(e) =>
                  setData1((d) => ({ ...d, password: e.target.value }))
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="password-input">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirmar Senha"
                value={data1.confirm}
                onChange={(e) =>
                  setData1((d) => ({ ...d, confirm: e.target.value }))
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {passwordMismatch && (
              <p className="error-message">As senhas não coincidem.</p>
            )}

            <div className="buttons-container">
              <button type="button" onClick={prev} className="back">
                Voltar
              </button>
              <button type="submit" className="next">
                Próximo
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              next();
            }}
          >
            <h2>Informações pessoais</h2>
            <input
              placeholder="Nome"
              value={data2.firstName}
              onChange={(e) =>
                setData2((d) => ({ ...d, firstName: e.target.value }))
              }
              required
            />
            <input
              placeholder="Sobrenome"
              value={data2.lastName}
              onChange={(e) =>
                setData2((d) => ({ ...d, lastName: e.target.value }))
              }
              required
            />
            <InputMask
              mask="999.999.999-99"
              value={data2.cpf}
              onChange={(e) => setData2((d) => ({ ...d, cpf: e.target.value }))}
            >
              {(inputProps: any) => (
                <input
                  {...inputProps}
                  type="text"
                  placeholder="CPF (xxx.xxx.xxx-xx)"
                  required
                />
              )}
            </InputMask>
            <input
              placeholder="Peso (kg)"
              value={data2.weight}
              onChange={(e) =>
                setData2((d) => ({ ...d, weight: e.target.value }))
              }
              required
            />
            <input
              placeholder="Altura (m)"
              value={data2.height}
              onChange={(e) =>
                setData2((d) => ({ ...d, height: e.target.value }))
              }
              required
            />
            <select
              value={data2.gender}
              onChange={(e) =>
                setData2((d) => ({ ...d, gender: e.target.value }))
              }
              required
            >
              <option value="">Gênero biológico</option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
            </select>
            <input
              type="date"
              value={data2.birthDate}
              onChange={(e) =>
                setData2((d) => ({ ...d, birthDate: e.target.value }))
              }
              required
              placeholder="Data de nascimento"
            />
            <div className="buttons-container">
              <button type="button" onClick={prev} className="back">
                Voltar
              </button>
              <button type="submit" className="next">
                Próximo
              </button>
            </div>
          </form>
        )}
        
        {step === 3 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <h2>Informações de treino</h2>
            <select
              value={data3.experience}
              onChange={(e) =>
                setData3((d) => ({ ...d, experience: e.target.value }))
              }
              required
            >
              <option value="">Experiência de treino</option>
              <option value="never">Nunca treinei</option>
              <option value="1-3m">1–3 meses</option>
              <option value="3-6m">3–6 meses</option>
              <option value="6-12m">6–12 meses</option>
              <option value="1-3y">1–3 anos</option>
              <option value="3-5y">3–5 anos</option>
              <option value="5+y">5+ anos</option>
            </select>
            
            <fieldset>
              <legend>Condições / Lesões</legend>
              {["Diabetes", "Hipertensão", "Obesidade", "Lesão no joelho", "Lesão nas costas", "Gravidez", "Asma"].map(
                (cond) => (
                  <label key={cond}>
                    <input
                      type="checkbox"
                      checked={data3.conditions.includes(cond)}
                      onChange={() => {
                        setData3((d) => ({
                          ...d,
                          conditions: d.conditions.includes(cond)
                            ? d.conditions.filter((c) => c !== cond)
                            : [...d.conditions, cond],
                        }));
                      }}
                    />
                    {cond}
                  </label>
                )
              )}
            </fieldset>
            
            <fieldset>
              <legend>Disponibilidade semanal</legend>
              {[
                "Segunda",
                "Terça",
                "Quarta",
                "Quinta",
                "Sexta",
                "Sábado",
                "Domingo",
              ].map((day) => (
                <label key={day}>
                  <input
                    type="checkbox"
                    checked={data3.weekdays.includes(day)}
                    onChange={() => {
                      setData3((d) => ({
                        ...d,
                        weekdays: d.weekdays.includes(day)
                          ? d.weekdays.filter((w) => w !== day)
                          : [...d.weekdays, day],
                      }));
                    }}
                  />
                  {day}
                </label>
              ))}
            </fieldset>
            
            <select
              value={data3.timePerDay}
              onChange={(e) =>
                setData3((d) => ({ ...d, timePerDay: e.target.value }))
              }
              required
            >
              <option value="">Tempo disponível / dia</option>
              {[...Array(12)].map((_, i) => {
                const mins = 15 * (i + 1);
                return (
                  <option key={mins} value={`${mins}min`}>
                    {mins} min
                  </option>
                );
              })}
            </select>
            
            <div className="buttons-container">
              <button type="button" onClick={prev} className="back">
                Voltar
              </button>
              <button type="submit">
                Finalizar cadastro
              </button>
            </div>
          </form>
        )}
      </div>
    </StyledRegister>
  );
}