import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
axios.defaults.withCredentials = true;
export const whoIsLogged = async () => {
  const getResponse = await axiosInstance.get(`/who`);
  return getResponse;
};
