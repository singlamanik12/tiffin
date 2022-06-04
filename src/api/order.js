import axios from "axios";
import api from "./config";
const postOrder = async (values) => {
  const result = await axios.post(api + "/checkLogin", values);
  return result;
};
const payOrder = async (values) => {
  const result = await axios.post(api + "/order/pay", values);
  return result;
};
const payOrderAccount = async (values) => {
  const { data } = await axios.get(api + "/seller/" + values);
  return data.PayAccount;
};
const saveOrder = async (values) => {
  const { data } = await axios.post(api + "/order/new", values);
  return data.PayAccount;
};

const getPastOrders = async (values) => {
  const { data } = await axios.get(api + "/order/past/" + values);
  return data;
};
export { postOrder, payOrder, payOrderAccount, saveOrder, getPastOrders };
