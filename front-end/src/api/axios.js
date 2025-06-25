import axios from 'axios';

// export const BASE_URL = 'https://localhost:555';
export const BASE_URL = 'http://localhost:8080';

export default axios.create({
  baseURL: BASE_URL + '/api',
  withCredentials: false,
});
