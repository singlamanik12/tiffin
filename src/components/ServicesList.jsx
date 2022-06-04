import { Grid } from "@mui/material";
import React from "react";
import ServiceOutline from "./ServiceOutline";

const ServicesList = ({ services = [] }) => {
  return (
    <>
      <Grid container>
        {services.map((service) => (
          <ServiceOutline service={service} />
        ))}
      </Grid>
    </>
  );
};

export default ServicesList;
