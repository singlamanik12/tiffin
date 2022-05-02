import axios from "axios";
import api from "./config";
const login = async (values) => {
  const result = await axios.post(api + "/checkLogin", values);
  return result;
};

const signup = async (values) => {
  const result = await axios.post(api + "/signup", values);
  return result;
};

const getMenuById = async (values) => {
  const result = await axios.get(api + "/menu/fetchById/" + values);
  return result;
};

export { login, signup, getMenuById };
