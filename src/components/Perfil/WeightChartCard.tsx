// src/components/WeightChartCard.tsx
import React from 'react';
import { styled } from '@stitches/react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Estrutura de cada ponto de dado
export interface DataPoint {
  date: string;      // ex: '2025-05-12'
  weight: number;    // peso em kg
}

export interface WeightChartCardProps {
  /** Dados históricos de peso */
  data: DataPoint[];
  /** Dados de previsão de peso opcional */
  forecastData?: DataPoint[];
  /** Título do card */
  title?: string;
}

// Estilos do card
const Card = styled('div', {
  backgroundColor: '#1e1e1e',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
  display: 'flex',
  flexDirection: 'column',
});

// Título do card
const Title = styled('h2', {
  fontSize: '1.25rem',
  fontWeight: 500,
  marginBottom: '1rem',
  color: '#ffffff',
});

// Container responsivo para o gráfico
const ChartContainer = styled('div', {
  width: '100%',
  height: '300px',
});

export const WeightChartCard: React.FC<WeightChartCardProps> = ({
  data,
  forecastData,
  title = 'Peso ao Longo do Tempo',
}) => {
  return (
    <Card>
      <Title>{title}</Title>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#333333" strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fill: '#ffffff', fontSize: 12 }} />
            <YAxis tick={{ fill: '#ffffff', fontSize: 12 }} unit="kg" />
            <Tooltip
              contentStyle={{ backgroundColor: '#2c2c2c', border: 'none', color: '#fff' }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ color: '#ffffff' }} />
            {/* Linha de dados históricos */}
            <Line
              type="monotone"
              name="Histórico"
              dataKey="weight"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 3, fill: '#8884d8' }}
            />
            {/* Linha de previsão, se fornecida */}
            {forecastData && (
              <Line
                type="monotone"
                name="Previsão"
                data={forecastData}
                dataKey="weight"
                stroke="#82ca9d"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3, fill: '#82ca9d' }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
};