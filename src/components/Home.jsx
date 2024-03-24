import React, { useContext, useEffect } from "react";
import Layout from "../shared/Layout";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select, Grid, Typography } from "@mui/material";
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
    // const menus = await getMenuByCity();
    // setServices(menus.data);
  };
  useEffect(() => onLoad(), []);
  const handleChange = (event) => {
    window.location.href = `/services/${event.target.value}`;
  };
  return (
    <Layout style={{ paddingTop: 70 }}>
      <Grid container style={{ paddingInline: 10 }}>
        <FormControl
          fullWidth
          style={{ marginBottom: "90px" }}
          variant="outlined"
        >
          <InputLabel id="demo-simple-select-label">Select city</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={citi}
            label="Select city"
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#9f6ba0", // Change this to the desired color
              },
            }}
          >
            {cityList.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography
          variant={"h5"}
          fontWeight="bold"
          style={{ paddingBottom: 20, fontStyle: "italic" }}
          align="center"
          textAlign="center"
        >
          <span style={{ color: "#162328" }}>Your Daily Dose of Delight:</span>{" "}
          <span style={{ color: "#9f6ba0" }}>Open, Eat, Enjoy!</span>
        </Typography>
        <Typography
          variant={"h6"}
          style={{ paddingBottom: 20, fontStyle: "italic", color: "gray" }}
        >
          Welcome to our{" "}
          <span style={{ color: "#9f6ba0", fontWeight: "bolder" }}>
            exclusive pilot program
          </span>
          , bridging the gap between you and a tantalizing array of tiffin
          services across Canada! Whether you're seeking 'tiffins near me' or
          exploring 'tiffin services in Ottawa, Vancouver, Toronto, Montreal, or
          any other city,' our platform is your ultimate destination for
          culinary exploration. With a diverse network of local tiffin providers
          spanning the nation, we're dedicated to bringing the flavors of Canada
          straight to your doorstep. Join us on this flavorful journey, where
          every meal is a celebration of Canada's rich culinary heritage. Your
          feedback fuels our mission to redefine convenience and satisfaction in
          tiffin service aggregation, ensuring that your quest for the perfect
          meal is met with unparalleled ease and excellence!
        </Typography>
      </Grid>

      <ServicesList services={services} />
    </Layout>
  );
}

export default Home;
