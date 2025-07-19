import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001', // or use '/api' with Vite proxy
  withCredentials: true, // only if using cookies
});

export default API;
