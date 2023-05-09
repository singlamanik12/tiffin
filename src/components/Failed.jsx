import { Grid } from "@mui/material";
import React from "react";
import failed from "../resources/failed.json";
import Lottie from "lottie-react";
const Failed = () => {
  return (
    <Grid container>
      <Grid item xs={12} container justifyItems="center">
        <Lottie animationData={failed} loop={true} />
      </Grid>
    </Grid>
  );
};

export default Failed;
