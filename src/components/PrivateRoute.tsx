import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/register" replace />;
};
