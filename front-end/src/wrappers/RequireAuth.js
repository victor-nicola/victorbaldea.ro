import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RequireAuth({ children }) {
  const { accessToken, loading } = useAuth();

  if (loading) return null;

  return accessToken ? children : <Navigate to="/log-in" replace />;
}
