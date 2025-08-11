import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        try {
            const res = await axios.post('/getAccessToken', {}, {withCredentials: true});
            setAccessToken(res?.data?.accessToken);
        } catch {
            setAccessToken(null);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        refresh();
    }, []);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);