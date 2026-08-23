import axios from "axios";


const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

// Request: attach auth token or what ever you need to send with every request
http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response: handle 401 + normalize errors
http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    return Promise.reject(error);
  }
);

export default http;
