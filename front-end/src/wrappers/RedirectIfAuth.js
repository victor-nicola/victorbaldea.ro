import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RedirectIfAuth({ children }) {
  const { accessToken, loading } = useAuth();

  if (loading) return null;

  return accessToken ? <Navigate to="/dashboard" replace /> : children;
}
