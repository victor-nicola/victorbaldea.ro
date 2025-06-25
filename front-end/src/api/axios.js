import axios from 'axios';

export const BASE_URL = 'https://localhost:555';

export default axios.create({
  baseURL: BASE_URL + '/api',
  withCredentials: false,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL + '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
