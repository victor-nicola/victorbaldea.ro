import axios from '../api/axios';
import * as SecureStore from 'expo-secure-store';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const {logout} = useAuth();
  const refresh = async() => {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    try {
      const response = await axios.post('/refreshToken',
        JSON.stringify({jwt: refreshToken}),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      await SecureStore.setItemAsync('accessToken', response.data.accessToken);
    }
    catch (err) {
      if (err?.response?.status === 403)
        logout();
    }
    return SecureStore.getItem('accessToken');
  }
  return refresh;
};

export default useRefreshToken;