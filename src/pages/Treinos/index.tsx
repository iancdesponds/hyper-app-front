// src/pages/Treinos.tsx

import React, { useContext, useEffect, useState } from "react";
import {
  Clock,
  List,
  Repeat,
  Edit,
  Flame,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Sidebar from "../../components/Sidebar";
import {
  StyledHome,
  Content,
  SummaryCard,
  TreinoGrid,
  TreinoCard,
  Badge,
  ProgressBarContainer,
  ProgressFill,
  FilterBar,
  MuscleTag,
  ActionButton,
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
  calories?: number;
  muscle_groups?: string[];
  last_executed?: string;
  exercises: Exercicios[];
}

type TreinoData = Record<string, Treino>;

export default function Treinos() {
  const { logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [treinos, setTreinos] = useState<TreinoData>({});
  const [weekRange, setWeekRange] = useState("");
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Formata semana
  useEffect(() => {
    const now = new Date();
    const monday = new Date(now.setDate(now.getDate() - now.getDay() + 1));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const fmt = (d: Date) => d.toLocaleDateString('pt-BR',{day:'2-digit',month:'short'});
    setWeekRange(`Semana ${fmt(monday)} – ${fmt(sunday)}`);
  }, []);

  // Carrega dados
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${import.meta.env.VITE_TRAINING_URL}/treino`, {
          credentials: 'include',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.status === 401) { logout(); return navigate('/login'); }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: TreinoData = await res.json();
        setTreinos(data);
      } catch (e:any) {
        console.error('Erro ao buscar treinos', e);
      }
    }
    load();
  }, [token, logout, navigate]);

  const diasSemana: Record<string,string> = {
    monday:'Segunda-feira',tuesday:'Terça-feira',wednesday:'Quarta-feira',
    thursday:'Quinta-feira',friday:'Sexta-feira',saturday:'Sábado',sunday:'Domingo'
  };

  // Resumo semanal
  const agendados = Object.keys(treinos).length;
  const series = Object.values(treinos)
    .reduce((s,t)=> s + t.exercises.reduce((ss,e)=> ss+e.reps.length,0),0);
  const calorias = Object.values(treinos)
    .reduce((s,t)=> s + (t.calories||0),0);

  // Aplica filtro
  const filtered = Object.entries(treinos)
    .filter(([key,t]) => {
      if (filter==='all') return true;
      const done = !!t.last_executed;
      return filter==='completed'? done : !done;
    });

  return (
    <StyledHome>
      <Sidebar />
      <Content>
        <h1>Meus Treinos</h1>
        <h2>{weekRange}</h2>

        <SummaryCard>
          <div><List size={16}/> Agendados: {agendados}</div>
          <div><Repeat size={16}/> Séries: {series}</div>
        </SummaryCard>

        <FilterBar>
          <button onClick={()=>setFilter('all')} className={filter==='all'?'active':''}>Todos</button>
          <button onClick={()=>setFilter('pending')} className={filter==='pending'?'active':''}>Pendentes</button>
          <button onClick={()=>setFilter('completed')} className={filter==='completed'?'active':''}>Concluídos</button>
        </FilterBar>

        <TreinoGrid>
          {filtered.map(([key,treino]) => {
            const done = !!treino.last_executed;
            const totalSets = treino.exercises.reduce((s,e)=>s+e.reps.length,0);
            const progress = done?100:0;
            return (
              <TreinoCard key={key}>
                <div>
                  <span className="day">{diasSemana[key]}</span>
                  <Badge variant={done?'completed':'pending'}>
                    {done ? 'Concluído' : 'Pendente'}
                  </Badge>
                </div>
                <h2>{treino.name}</h2>
                <div className="info">
                  <Clock size={14}/> {treino.expected_duration} min
                  {treino.calories!=null && <><Flame size={14}/> {treino.calories} kcal</>}
                </div>
                <div className="muscles">
                  {treino.muscle_groups?.map(m=> <MuscleTag key={m}>{m}</MuscleTag>)}
                </div>
                <ProgressBarContainer>
                  <ProgressFill style={{width:`${progress}%`}}/>
                </ProgressBarContainer>
                <div className="actions">
                  <ActionButton onClick={()=>{
                    localStorage.setItem('currentTreino',JSON.stringify(treino));
                    navigate(`/treino/${key}`);
                  }}><Clock size={16}/> Iniciar</ActionButton>
                </div>
              </TreinoCard>
            );
          })}
        </TreinoGrid>
      </Content>
    </StyledHome>
  );
}
