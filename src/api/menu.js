import axios from "axios";
import api from "./config";
import { encryptParams, encryptPayload } from "./encrypt";
const updateMenu = async (values) => {
  const result = await axios.post(api + "/menu/update", encryptPayload(values));
  return result;
};
const getMenuBySelId = async (values) => {
  const result = await axios.get(
    api + "/menu/fetchBySelId/" + encryptParams(values.toString())
  );
  return result;
};
const getMenuByCode = async (values) => {
  const result = await axios.get(
    api + "/menu/fetchByCode/" + encryptParams(values.toString())
  );
  return result;
};
const getMenuByCity = async (values) => {
  const result = await axios.get(
    api + "/menu/fetchByCity/" + encryptParams(values?.toString())
  );
  return result;
};

const getSellerById = async (values) => {
  const result = await axios.get(
    api + "/seller/" + encryptParams(values.toString())
  );
  return result;
};
const getWebsiteConfig = async (values) => {
  const result = await axios.post(
    api + "/website/config",
    encryptPayload(values)
  );
  return result;
};
export {
  updateMenu,
  getMenuBySelId,
  getMenuByCity,
  getSellerById,
  getMenuByCode,
  getWebsiteConfig,
};
