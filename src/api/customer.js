import axios from "axios";
import api from "./config";
import { encryptParams, encryptPayload } from "./encrypt";
const login = async (values) => {
  const result = await axios.post(api + "/checkLogin", encryptPayload(values));
  return result;
};

const signup = async (values) => {
  const result = await axios.post(api + "/signup", encryptPayload(values));
  return result;
};

const getMenuById = async (values) => {
  const result = await axios.get(
    api + "/menu/fetchById/" + encryptParams(values)
  );
  return result;
};

export { login, signup, getMenuById };
