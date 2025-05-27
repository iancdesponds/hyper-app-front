import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams pode ser removido se 'id' da URL não for mais usado
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
  id: number; // Este é o ID do banco de dados, vindo do localStorage
  name: string;
  expected_duration: number;
  exercises: Exercicios[];
}

export default function ExecutarTreino() {
  const navigate = useNavigate();
  // const { id: routeKey } = useParams(); // O 'id' da URL ('saturday') não será usado para o DB ID.
                                        // Renomeie se precisar dele para outra coisa, ou remova useParams se não for usado.
  const [treino, setTreino] = useState<Treino | null>(null);
  const [tempo, setTempo] = useState(0);
  const [checkState, setCheckState] = useState<Record<string, boolean>>({});
  const [customSets, setCustomSets] = useState<
    Record<string, { peso: string; reps: string }>
  >({});
  const [startTime] = useState<Date>(new Date());

  useEffect(() => {
    const data = localStorage.getItem("currentTreino");
    if (data) {
      const parsedTreino: Treino = JSON.parse(data);
      setTreino(parsedTreino);
    } else {
      // Opcional: lidar com o caso de não haver treino no localStorage
      console.error("Nenhum treino encontrado no localStorage.");
      alert("Erro ao carregar dados do treino. Retornando para a lista de treinos.");
      navigate("/treinos");
    }

    const interval = setInterval(() => setTempo((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [navigate]); // Removido routeKey se useParams não for mais usado para buscar dados

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
    if (!treino || typeof treino.id !== 'number' || treino.id <= 0) { // Verificação robusta do ID do treino
      alert("Dados do treino inválidos ou ID do treino ausente. Não é possível finalizar.");
      console.error("Tentativa de finalizar com dados de treino inválidos:", treino);
      return;
    }
    if (!window.confirm("Deseja realmente finalizar o treino?")) return;

    const numericDbId = treino.id; // USA O ID NUMÉRICO DO OBJETO TREINO
    const endTime = new Date();

    const concludePayload = {
      train_id: numericDbId, // <--- CORRIGIDO
      inicio: startTime.toISOString(),
      fim: endTime.toISOString(),
    };
    const changePayload = {
      train_id: numericDbId, // <--- CORRIGIDO
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
              rest_time: ex.rest[setIdx] ?? 0,
            };
          })
          .filter((s) => s !== null);
        return {
          nome_exercicio: ex.exercise_name,
          series: seriesFeitas,
        };
      }),
    };
    const evoPayload = { train_id: numericDbId }; // <--- CORRIGIDO

    try {
      const token = localStorage.getItem("token");
      // 1) Atualiza metadados (conclude_train)
      const resp1 = await fetch(
        `${import.meta.env.VITE_TRAINING_URL}/treino/conclude_train`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(concludePayload),
        }
      );
      if (!resp1.ok) {
        const errorData = await resp1.json().catch(() => ({ detail: "Falha ao finalizar treino" }));
        throw new Error(`Falha ao finalizar treino (${resp1.status}): ${errorData.detail}`);
      }

      // 2) Atualiza valores das séries (change_train_values)
      const resp2 = await fetch(
        `${import.meta.env.VITE_TRAINING_URL}/treino/change_train_values`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(changePayload),
        }
      );
      if (!resp2.ok) {
        const errorData = await resp2.json().catch(() => ({ detail: "Falha ao salvar séries do treino" }));
        throw new Error(`Falha ao salvar séries do treino (${resp2.status}): ${errorData.detail}`);
      }

      // 3) Cria treino de evolução (evo)
      const resp3 = await fetch(
        `${import.meta.env.VITE_TRAINING_URL}/treino/evo`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(evoPayload),
        }
      );
      if (!resp3.ok) {
        const errorData = await resp3.json().catch(() => ({ detail: "Falha ao criar treino de evolução" }));
        throw new Error(`Falha ao criar treino de evolução (${resp3.status}): ${errorData.detail}`);
      }

      navigate("/treinos");
    } catch (error: any) {
      console.error("Erro no processamento ao finalizar treino:", error);
      alert(`Erro no processamento: ${error.message}. Tente novamente.`);
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