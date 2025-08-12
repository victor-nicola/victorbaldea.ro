import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../contexts/AuthContext';

const useRefreshToken = () => {
  const {setAccessToken} = useAuth();
  const navigate = useNavigate();
  
  const refresh = async() => {
    try {
      const response = await axios.post('/getAccessToken', {},
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      return response.data.accessToken;
    }
    catch (err) {
      if (err?.response?.status === 403) {
        try {
            await axios.post('/logout', {}, {withCredentials: true});
        } catch (err) {
            console.error('Logout failed:', err);
        } finally {
            setAccessToken(null);
            navigate('/');
        }
      }
    }
  }
  return refresh;
};

export default useRefreshToken;