import axios from 'axios';

const instance = axios.create({
  baseURL: 'backend-production-225f.up.railway.app/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;