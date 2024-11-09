// utils/http.js
import axios from 'axios';

const http = axios.create({
  baseURL: 'https://backend-4-p3xw.onrender.com/api', // Adjust if needed
  timeout: 5000, // Increase timeout if requests take longer
});

export default http;
