import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backend-production-0b8e.up.railway.app/api', // Asegúrate de que la URL tenga el protocolo correcto (http/https)
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;