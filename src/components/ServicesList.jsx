import React, { useEffect } from "react";
import ServiceOutline from "./ServiceOutline";
import { Grid } from "@mui/material";

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
