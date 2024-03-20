import axios from "axios";
import api from "./config";
import { encryptParams, encryptPayload } from "./encrypt";
const postOrder = async (values) => {
  const result = await axios.post(api + "/checkLogin", encryptPayload(values));
  return result;
};
const payOrder = async (values) => {
  const result = await axios.post(api + "/order/pay", encryptPayload(values));
  return result;
};
const payOrderAccount = async (values) => {
  const { data } = await axios.get(
    api + "/seller/" + encryptParams(values.toString())
  );
  return data.PayAccount;
};
const saveOrder = async (values) => {
  const { data } = await axios.post(api + "/order/new", encryptPayload(values));
  return data;
};
const saveOnlineOrder = async (values) => {
  const { data } = await axios.post(
    api + "/online/order/new",
    encryptPayload(values)
  );
  return data;
};
const getPastOrders = async (values) => {
  const { data } = await axios.get(
    api + "/order/past/" + encryptParams(values.toString())
  );
  return data;
};
const getPendingOrders = async (values) => {
  const { data } = await axios.post(
    api + "/pending/orders",
    encryptPayload(values)
  );
  return data;
};
export {
  postOrder,
  payOrder,
  payOrderAccount,
  saveOrder,
  getPastOrders,
  getPendingOrders,
  saveOnlineOrder,
};
