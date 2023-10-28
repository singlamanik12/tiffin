import axios from "axios";
import api from "./config";

const getPaymentConfig = async (values) => {
  const result = await axios.post(api + "/payment/config", values);
  return result;
};
export { getPaymentConfig };
