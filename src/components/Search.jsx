import React, { useContext, useEffect } from "react";
import Layout from "../shared/Layout";
import ServicesList from "./ServicesList";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useParams } from "react-router-dom";
import { getMenuByCity } from "../api/menu";
import DataContext from "../api/context";
const Search = () => {
  const [citi, setCity] = React.useState("");
  const [cityList, setCityList] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const { city } = useParams();
  const { setLoading } = useContext(DataContext);
  const onLoad = async () => {
    setLoading(true);
    const { data } = await axios.get(
      "https://singlamanik12.github.io/cities/ca.json"
    );
    setCityList(data.cities);
    fetchDataByCity();
  };
  useEffect(() => onLoad(), []);
  const fetchDataByCity = async () => {
    const res = city.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
    const { data } = await getMenuByCity(res);
    setCity(res);
    setServices(data);
    setLoading(false);
  };
  const handleChange = (event) => {
    window.location.href = `/services/${event.target.value}`;
  };
  return (
    <Layout style={{ paddingTop: "30px" }}>
      <FormControl fullWidth style={{ marginBottom: "20px" }}>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={citi}
          label="City"
          onChange={handleChange}
        >
          {cityList.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ServicesList services={services} />
    </Layout>
  );
};

export default Search;
