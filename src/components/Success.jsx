import { Grid, Button } from "@mui/material";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../resources/success.json";
import { useNavigate } from "react-router-dom";
const Success = () => {
  const navigate = useNavigate();
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Grid container>
      <Grid item xs={12} container justifyItems="center">
        <Lottie options={defaultOptions} height={400} width={400} />
      </Grid>
      <Grid item xs={12} container justifyItems="center" alignItems="center">
        <Button onClick={() => navigate("/orders")}>Your orders</Button>
      </Grid>
    </Grid>
  );
};

export default Success;
