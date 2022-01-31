import React from "react";
import { Grid, Typography } from "@mui/material";
import Layout from "../shared/Layout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CopyrightIcon from "@mui/icons-material/Copyright";
const Footer = () => {
  return (
    <Grid
      container
      style={{
        height: "30vh",
        backgroundColor: "black",
        marginTop: 100,
        paddingBlock: 30,
      }}
    >
      <Layout>
        <Grid
          xs={12}
          container
          style={{ color: "white" }}
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Typography
            style={{
              verticalAlign: "middle",
              display: "inline-flex",
            }}
          >
            Made with <FavoriteIcon sx={{ color: "red", marginInline: 0.3 }} />{" "}
            in Canada
          </Typography>
          <Typography
            style={{
              verticalAlign: "middle",
              display: "inline-flex",
            }}
          >
            {" "}
            <CopyrightIcon />
            2021 Daily Cater Technologies Inc.
          </Typography>
          <Typography>singlamanik12@gmail.com</Typography>
        </Grid>
      </Layout>
    </Grid>
  );
};

export default Footer;
