import axios from "axios";
import Cookies from "js-cookie";

const url = `${process.env.NEXT_PUBLIC_BASE_URL}`;
export const Axios = axios.create({
  baseURL: url,
});

Axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("user_token")?.trim();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);
