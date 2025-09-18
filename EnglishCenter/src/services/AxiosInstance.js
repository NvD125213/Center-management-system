import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://envidi.io.vn/api",
  withCredentials: true,
});
