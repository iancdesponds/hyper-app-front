// src/components/DashboardGrid.tsx
import React from 'react';
import { styled } from '@stitches/react';

// Componente de grid para dashboards
export const DashboardGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '1.5rem',
  marginTop: '2rem',
});