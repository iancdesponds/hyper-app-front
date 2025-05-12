// src/components/DashboardCard.tsx
import React from 'react';
import { styled } from '@stitches/react';

const Card = styled('div', {
  backgroundColor: '#1e1e1e',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  '& h2': {
    fontSize: '1.25rem',
    fontWeight: 500,
    marginBottom: '0.5rem',
  },

  '& span': {
    fontSize: '2rem',
    fontWeight: 700,
    marginTop: 'auto',
  },
});

export interface DashboardCardProps {
  title: string;
  value: React.ReactNode;
}

export function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <Card>
      <h2>{title}</h2>
      <span>{value}</span>
    </Card>
  );
}
