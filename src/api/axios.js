import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia esto según tu backend
  timeout: 5000,
});

export default instance;