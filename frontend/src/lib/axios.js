import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3001/api"        // dev on host
      : "http://backend:3001/api",         // prod in Docker
  withCredentials: true,
});
