import axios from 'axios';

// Make sure your backend (server1.js) is running on port 5001
const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // IMPORTANT: This sends the httpOnly cookie with each request
});

export default api;