import React, { useContext, useEffect } from "react";
import Layout from "../shared/Layout";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select, Grid } from "@mui/material";
import axios from "axios";
import DataContext from "../api/context";
import { getMenuByCity } from "../api/menu";
import ServicesList from "./ServicesList";
function Home() {
  const [citi, setCity] = React.useState("");
  const [cityList, setCityList] = React.useState([]);
  const { setLoading } = useContext(DataContext);
  const [services, setServices] = React.useState([]);
  const onLoad = async () => {
    setLoading(true);
    const { data } = await axios.get(
      "https://singlamanik12.github.io/tiffin-conf/ca.json"
    );
    setCityList(data.cities);
    setLoading(false);
    const menus = await getMenuByCity("Brampton");
    setServices(menus.data);
  };
  useEffect(() => onLoad(), []);
  const handleChange = (event) => {
    window.location.href = `/services/${event.target.value}`;
  };
  return (
    <Layout style={{ paddingTop: 70 }}>
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
}

export default Home;
