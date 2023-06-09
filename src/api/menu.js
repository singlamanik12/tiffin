import axios from "axios";
import api from "./config";
const updateMenu = async (values) => {
  const result = await axios.post(api + "/menu/update", values);
  return result;
};
const getMenuBySelId = async (values) => {
  const result = await axios.get(
    api + "/menu/fetchBySelId/" + values.toString()
  );
  return result;
};

const getMenuByCity = async (values) => {
  const result = await axios.get(
    api + "/menu/fetchByCity/" + values?.toString()
  );
  return result;
};

const getSellerById = async (values) => {
  const result = await axios.get(api + "/seller/" + values.toString());
  return result;
};

export { updateMenu, getMenuBySelId, getMenuByCity, getSellerById };
