import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingPage from '../pages/public/LoadingPage';

export default function RedirectIfAuth({ children }) {
    const { accessToken, loading } = useAuth();

    if (loading) return <LoadingPage />;

    return accessToken ? <Navigate to="/dashboard" replace /> : children;
}
