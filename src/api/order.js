import axios from "axios";
import api from "./config";
const postOrder = async (values) => {
  const result = await axios.post(api + "/checkLogin", values);
  return result;
};

export { postOrder };
