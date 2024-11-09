// utils/http.js
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if needed
  timeout: 5000, // Increase timeout if requests take longer
});

export default http;
