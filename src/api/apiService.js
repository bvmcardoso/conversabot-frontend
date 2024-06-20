/** @format */

// apiService.js
import axios from 'axios';

// Create a new Axios instance
const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Base URL for API requests
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`, // Authorization header with token (optional)
    'Content-Type': 'application/json',
  },
});

export default apiService;
