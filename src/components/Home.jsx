import React, { useState } from "react";
import Layout from "../shared/Layout";
import BasicSelect from "../shared/BasicSelect";
import Grid from "@mui/material/Grid";
import LocationSearchInput from "./LocationSearchInput";
function Home() {
  const [city, setCity] = useState(10);
  const handleChange = (event) => {
    setCity(event.target.value);
  };
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      //justifyContent="center"
      style={{ minHeight: "90vh" }}
    >
      <Grid item xs={2} />
      <Grid item xs={8}>
        <LocationSearchInput />
      </Grid>
      <Grid item xs={2} />
      {/* <BasicSelect label="City" value={city} handleChange={handleChange} /> */}
    </Grid>
  );
}

export default Home;
