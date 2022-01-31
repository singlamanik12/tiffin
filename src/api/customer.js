import axios from "axios";
import api from "./config";
const login = async (values) => {
  const result = await axios.post(api + "/customer/checkLogin", values);
  return result;
};

const signup = async (values) => {
  const result = await axios.post(api + "/customer/signup", values);
  return result;
};

export { login, signup };
