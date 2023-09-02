import axios from "axios";
axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: `http://localhost:3300`,
  withCredentials: true,
});
export default axiosInstance;
