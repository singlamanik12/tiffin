import React from "react";
import ServiceOutline from "./ServiceOutline";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
const ServicesList = () => {
  return (
    <>
      <Grid container>
        <ServiceOutline />

        <ServiceOutline />
        <ServiceOutline />
      </Grid>
    </>
  );
};

export default ServicesList;
