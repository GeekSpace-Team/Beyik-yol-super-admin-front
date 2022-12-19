import axios from "axios";

export const BASE_URL = "http://10.192.168.26:5500/";
export const BASE_URL_2 = "http://10.192.168.26:5500";
const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("my_token")}`,
  },
});
const AxiosInstanceFormData = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("my_token")}`,
    "Content-Type": "multipart/form-data",
  },
});
export { AxiosInstance };
export { AxiosInstanceFormData };
