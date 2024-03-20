import axios from "axios";
import api from "./config";
import { encryptPayload } from "./encrypt";

const getPaymentConfig = async (values) => {
  const result = await axios.post(
    api + "/payment/config",
    encryptPayload(values)
  );
  return result;
};
export { getPaymentConfig };
