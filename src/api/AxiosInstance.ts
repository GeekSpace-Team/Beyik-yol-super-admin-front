import axios from "axios";

// export const BASE_URL = "http://192.168.1.8:6967/";
// export const BASE_URL_2 = "http://192.168.1.8:6967";

// export const BASE_URL = "http://192.168.97.59:6967/";
// export const BASE_URL_2 = "http://192.168.97.59:6967";

export const BASE_URL = "https://beyikyol.com/";
export const BASE_URL_2 = "https://beyikyol.com";

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
