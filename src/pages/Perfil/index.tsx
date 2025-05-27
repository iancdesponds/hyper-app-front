// src/pages/Perfil.tsx

import React, { useContext, useEffect, useState } from "react";
import { DashboardCard } from "../../components/Perfil/DashBoardCard";
import { DashboardGrid } from "../../components/Perfil/DashBoardGrid";
import { DataPoint, WeightChartCard } from "../../components/Perfil/WeightChartCard";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../contexts/AuthContext";
import { StyledHome, Content } from "./styles";

interface APIResponse {
  Complete?: Record<string, any>;
  Incomplete?: Record<string, any>;
}

interface TreinoData {
  [key: string]: any;
}

export default function Perfil() {
  const { token } = useContext(AuthContext);

  const [totalConcluidos, setTotalConcluidos] = useState<number>(0);
  const [nextTreino, setNextTreino] = useState<string>("--");
  const [error, setError] = useState<string | null>(null);

  const diasSemana: Record<string, string> = {
    sunday: "Domingo",
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado",
  };

  const weightData: DataPoint[] = [
    { date: "2025-05-01", weight: 73.2 },
    { date: "2025-05-03", weight: 72.8 },
    { date: "2025-05-05", weight: 72.5 },
    { date: "2025-05-07", weight: 72.3 },
  ];
  const forecastData: DataPoint[] = [
    { date: "2025-05-09", weight: 72.0 },
    { date: "2025-05-11", weight: 71.8 },
    { date: "2025-05-13", weight: 71.5 },
    { date: "2025-06-13", weight: 61.5 },
    { date: "2025-06-15", weight: 40.5 },
  ];

  // Conta treinos concluídos lendo data.Complete
  useEffect(() => {
    async function fetchConcluded() {
      try {
        const res = await fetch("http://localhost:8003/treino/all", {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: APIResponse = await res.json();
        console.log("fetchConcluded: recibo", data);

        const completeMap = data.Complete || {};
        const count = Object.keys(completeMap).length;
        console.log("fetchConcluded: totalConcluidos calculado", count);
        setTotalConcluidos(count);
      } catch (err: any) {
        console.error("Erro ao buscar treinos concluídos:", err);
        setError(err.message);
      }
    }
    fetchConcluded();
  }, []);

  // Calcula próximo treino da semana
  useEffect(() => {
    async function fetchSchedule() {
      try {
        const res = await fetch("http://localhost:8003/treino", {
          credentials: "include",
          headers: {
            Authorization: token ? `Bearer ${token}` : ""
          }
        });
        if (!res.ok) return;
        const schedule: TreinoData = await res.json();
        console.log("fetchSchedule: schedule recebido", schedule);

        const weekdays = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        const today = new Date().getDay();
        for (let i = 1; i <= 7; i++) {
          const idx = (today + i) % 7;
          const key = weekdays[idx];
          if (schedule[key]) {
            setNextTreino(diasSemana[key]);
            break;
          }
        }
      } catch (err: any) {
        console.error("Erro ao buscar agenda de treinos:", err);
      }
    }
    fetchSchedule();
  }, [token]);

  return (
    <StyledHome>
      <Sidebar />
      <Content>
        <h1>Meu Perfil</h1>
        {error && <p style={{ color: "tomato" }}>{error}</p>}
        <DashboardGrid>
          <DashboardCard
            title="Treinos Concluídos"
            value={String(totalConcluidos).padStart(3, "0")}
          />
          <DashboardCard title="Próximo Treino" value={nextTreino} />
          <DashboardCard title="Calorias Queimadas" value="5.432" />
          <DashboardCard title="Peso Atual" value="72 kg" />
          <DashboardCard title="Meta Semanal" value="+1 kg" />
        </DashboardGrid>
        <WeightChartCard data={weightData} forecastData={forecastData} />
      </Content>
    </StyledHome>
  );
}
