import React from "react";
import Grid from "@mui/material/Grid";
const Layout = (props) => {
  return (
    <Grid container direction="row">
      <Grid item lg={3} md={2} />
      <Grid item lg={6} md={8} sm={12} container direction="column">
        {props.children}
      </Grid>
      <Grid item lg={3} md={2} />
    </Grid>
  );
};

export default Layout;
