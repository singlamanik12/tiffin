import { Grid, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import success from "../resources/success.json";
const Success = () => {
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item xs={12} container justifyItems="center">
        <Lottie animationData={success} loop={true} />
      </Grid>
      <Grid item xs={12} container justifyItems="center" alignItems="center">
        <Button onClick={() => navigate("/orders")}>Your orders</Button>
      </Grid>
    </Grid>
  );
};

export default Success;
