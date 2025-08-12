import axios from 'axios';

// export const BASE_URL = 'http://localhost:8080';
export const BASE_URL = 'https://api.victorbaldea.ro';

export default axios.create({
  baseURL: BASE_URL + '/api',
  withCredentials: false,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL + '/api',
  withCredentials: false,
});