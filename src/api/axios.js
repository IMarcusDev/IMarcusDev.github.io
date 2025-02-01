import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambia esto según tu backend
  timeout: 5000,
});

export default instance;