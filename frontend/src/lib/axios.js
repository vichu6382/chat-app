import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});
