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
  id: number;
  name: string;
  expected_duration: number;
  exercises: Exercicios[];
}

export default function ExecutarTreino() {
  const navigate = useNavigate();
  const { id } = useParams(); // id do treino existente
  const [treino, setTreino] = useState<Treino | null>(null);
  const [tempo, setTempo] = useState(0);
  const [checkState, setCheckState] = useState<Record<string, boolean>>({});
  const [customSets, setCustomSets] = useState<
    Record<string, { peso: string; reps: string }>
  >({});
  const [startTime] = useState<Date>(new Date());

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

  const handleFinalize = async () => {
    if (!treino) return;

    if (!window.confirm("Deseja realmente finalizar o treino?")) return;

    const endTime = new Date();
    const payload = {
      train_id: Number(id),
      nome_treino: treino.name,
      inicio: startTime.toISOString(),
      fim: endTime.toISOString(),
      tempo_total_segundos: tempo,
      exercicios: treino.exercises.map((ex, exIndex) => {
        const seriesFeitas = ex.reps
          .map((_, setIdx) => {
            const key = `${exIndex}-${setIdx}`;
            if (!checkState[key]) return null;
            return {
              serie: setIdx + 1,
              peso: parseFloat(
                customSets[key]?.peso ?? String(ex.weight[setIdx])
              ),
              reps: parseInt(
                customSets[key]?.reps ?? String(ex.reps[setIdx]),
                10
              ),
            };
          })
          .filter((s) => s !== null);

        return {
          nome_exercicio: ex.exercise_name,
          series: seriesFeitas,
        };
      }),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_TRAINING_URL}/treino/salvar_treino`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error("Erro ao salvar treino");
      navigate("/treinos");
    } catch (error) {
      console.error(error);
      alert("Falha ao salvar treino. Tente novamente.");
    }
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
        <button className="finalizar" onClick={handleFinalize}>
          Finalizar Treino
        </button>
      </Header>

      <TitleBar>{treino.name}</TitleBar>

      {treino.exercises.map((ex, exIndex) => (
        <ExerciseBlock key={`${exIndex}`}>
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
                          const v = e.target.value.replace(/\D/g, "");
                          handleInputChange(key, "reps", v);
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
      ))}
    </StyledPage>
  );
}
