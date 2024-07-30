import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7213",
  ///baseURL: "https://rss.somee.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
