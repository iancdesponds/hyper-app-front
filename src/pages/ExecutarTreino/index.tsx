import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Clock } from "lucide-react";
import {
  StyledPage,
  Header,
  TitleBar,
  ExerciseBlock,
  SetRow,
  CheckButton,
  InputCell,
} from "./styles";

interface Exercicios {
  exercise_name: string;
  reps: number[];
  weight: number[];
  rest: number[];
}

interface Treino {
  name: string;
  expected_duration: number;
  exercises: Exercicios[];
}

export default function ExecutarTreino() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [treino, setTreino] = useState<Treino | null>(null);
  const [tempo, setTempo] = useState(0);
  const [checkState, setCheckState] = useState<Record<string, boolean>>({});
  const [customSets, setCustomSets] = useState<
    Record<string, { peso: string; reps: string }>
  >({});

  useEffect(() => {
    const data = localStorage.getItem("currentTreino");
    if (data) setTreino(JSON.parse(data));

    const interval = setInterval(() => setTempo((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatarTempo = (segundos: number) => {
    const m = Math.floor(segundos / 60);
    const s = segundos % 60;
    return `${m}m ${s.toString().padStart(2, "0")}s`;
  };

  const toggleCheck = (key: string) => {
    setCheckState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (
    key: string,
    field: "peso" | "reps",
    value: string
  ) => {
    setCustomSets((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const extrairPeso = (valor: number): string => {
    return String(valor ?? 0);
  };

  if (!treino) return <div>Carregando treino...</div>;

  return (
    <StyledPage>
      <Header>
        <button onClick={() => navigate("/treinos")}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Clock size={16} />
          <span>{formatarTempo(tempo)}</span>
        </div>
        <button className="finalizar">Finalizar Treino</button>
      </Header>

      <TitleBar>{treino.name}</TitleBar>

      {treino.exercises.map((ex, exIndex) => {
        const keyBase = `${exIndex}`;
        const dados = {
          reps: String(ex.reps),
          peso: String(ex.weight),
        };

        return (
          <ExerciseBlock key={keyBase}>
            <h3>{ex.exercise_name}</h3>
            <table>
              <thead>
                <tr>
                  <th>Set</th>
                  <th>Peso (kg)</th>
                  <th>Reps</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ex.reps.map((_, setIndex) => {
                  const key = `${exIndex}-${setIndex}`;
                  const peso = ex.weight[setIndex] ?? 0;
                  const rep = ex.reps[setIndex] ?? 0;

                  return (
                    <SetRow key={key}>
                      <td>{setIndex + 1}</td>
                      <td>
                        <InputCell
                          type="number"
                          inputMode="decimal"
                          step="0.01"
                          value={customSets[key]?.peso ?? String(peso)}
                          onChange={(e) =>
                            handleInputChange(key, "peso", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <InputCell
                          type="number"
                          inputMode="numeric"
                          step="1"
                          value={customSets[key]?.reps ?? String(rep)}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            handleInputChange(key, "reps", value);
                          }}
                        />
                      </td>
                      <td>
                        <CheckButton
                          selected={checkState[key]}
                          onClick={() => toggleCheck(key)}
                        >
                          <Check size={16} />
                        </CheckButton>
                      </td>
                    </SetRow>
                  );
                })}
              </tbody>
            </table>
          </ExerciseBlock>
        );
      })}
    </StyledPage>
  );
}
