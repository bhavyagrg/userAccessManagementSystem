import axios from "axios";

const API = axios.create({ baseURL: "/api" });

export const signup = (data) => API.post("/auth/signup", data);
export const login = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};
