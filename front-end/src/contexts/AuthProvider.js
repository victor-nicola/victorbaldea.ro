import {createContext, useState} from "react";
import * as SecureStore from 'expo-secure-store';
import axios from "../api/axios";
import { Alert } from "react-native";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(null);

  const checkIsLoggedIn = () => {
    const refreshToken = SecureStore.getItem('refreshToken');
    if (refreshToken)
      setAuth({isLoggedIn: true});
    else
      setAuth({isLoggedIn: false});
  };

  const checkRefreshToken = async() => {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    try {
      await axios.post('/checkRefreshToken',
        JSON.stringify({jwt: refreshToken}),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    catch (err) {
      if (err?.response?.status === 403) {
        await SecureStore.deleteItemAsync('refreshToken');
        await SecureStore.deleteItemAsync('accessToken');
        setAuth({isLoggedIn: false});
      }
    }
  }

  const logout = async() => {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    try {
      const response = await axios.post('/logout',
        JSON.stringify({jwt: refreshToken}),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      await SecureStore.deleteItemAsync('refreshToken');
      await SecureStore.deleteItemAsync('accessToken');
      setAuth(null);
    } catch (err) {
      // if (!err?.response) {
        // setErrMsg('Serverul nu a răspuns');
      // }
      Alert.alert('Eroare');
    }
  }

  const login = () => {
    setAuth({isLoggedIn: true});
  };

  return (
    <AuthContext.Provider value={{auth, login, logout, checkRefreshToken, checkIsLoggedIn}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;