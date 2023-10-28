import { Grid } from "@mui/material";
import React from "react";
import ServiceOutline from "./ServiceOutline";

const ServicesList = ({ services = [] }) => {
  return (
    <>
      <Grid container style={{ paddingInline: 10 }}>
        {services.map((service) => (
          <ServiceOutline key={service} service={service} />
        ))}
      </Grid>
    </>
  );
};

export default ServicesList;
