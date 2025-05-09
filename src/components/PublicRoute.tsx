import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export const PublicRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? <Navigate to="/" replace /> : children;
};
