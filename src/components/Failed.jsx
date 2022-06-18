import { Grid } from "@mui/material";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../resources/failed.json";
const Failed = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Grid item xs={12} container justifyItems="center">
      <Lottie options={defaultOptions} height={400} width={400} />
    </Grid>
  );
};

export default Failed;
