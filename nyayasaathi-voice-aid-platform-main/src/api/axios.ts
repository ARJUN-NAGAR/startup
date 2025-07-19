import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api', // You can remove /api if your routes are plain
  withCredentials: true, // only if using cookies/auth sessions
});

export default API;
