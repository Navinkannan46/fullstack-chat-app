import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"        // dev on host
      : "http://backend:5000/api",         // prod in Docker
  withCredentials: true,
});
