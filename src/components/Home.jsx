import React, { useContext, useEffect } from "react";
import Layout from "../shared/Layout";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select, Grid } from "@mui/material";
import axios from "axios";
import DataContext from "../api/context";
function Home() {
  const [citi, setCity] = React.useState("");
  const [cityList, setCityList] = React.useState([]);
  const { setLoading } = useContext(DataContext);
  const onLoad = async () => {
    setLoading(true);
    const { data } = await axios.get(
      "https://singlamanik12.github.io/cities/ca.json"
    );
    setCityList(data.cities);
    setLoading(false);
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
    </Layout>
  );
}

export default Home;
