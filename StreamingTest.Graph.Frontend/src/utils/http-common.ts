import axios from "axios";

 const httpClient = axios.create({
  baseURL: `http://${import.meta.env.VITE_API_URI}`,
  headers: {
    "Content-Type": "application/json",
  },
})

export default httpClient;