import React from "react";
import { Grid, Typography, Divider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CopyrightIcon from "@mui/icons-material/Copyright";
const Footer = () => {
  return (
    <>
      <Divider style={{ marginTop: 100 }} light={true} />
      <Grid
        container
        style={{
          height: "30vh",
          backgroundColor: "white",

          paddingBlock: 30,
        }}
      >
        <Grid xs={1} />
        <Grid xs={5} container style={{ color: "black" }}>
          <Grid item xs={12}>
            <Typography variant="h6">DT Meals</Typography>
          </Grid>
        </Grid>

        <Grid
          xs={5}
          container
          style={{ color: "black" }}
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          {" "}
          <Grid item xs={12}>
            <a
              style={{ color: "black", textDecoration: "none" }}
              href="https://seller.dtmeals.com"
            >
              <Typography variant="body2">Become a Seller!</Typography>
            </a>
          </Grid>
          <Grid item xs={12}>
            <a
              style={{ color: "black", textDecoration: "none" }}
              href="https://www.privacypolicygenerator.info/live.php?token=0eMserBhjszuOaDaPGat1FOf0DRscx4u"
            >
              <Typography variant="body2">Privacy Policy</Typography>
            </a>
          </Grid>
          <Grid item xs={12}>
            <a
              style={{ color: "black", textDecoration: "none" }}
              href="https://www.privacypolicygenerator.info/live.php?token=0eMserBhjszuOaDaPGat1FOf0DRscx4u"
            >
              <Typography variant="body2">Terms and Conditions</Typography>
            </a>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">help.dtmeals@gmail.com</Typography>
          </Grid>
        </Grid>
        <Grid xs={1} />
      </Grid>
      <Grid
        item
        xs={12}
        container
        alignItems="center"
        justifyCenter="center"
        direction="column"
        style={{ paddingBlock: 20 }}
      >
        <Typography
          variant="body2"
          style={{
            color: "gray",
            verticalAlign: "middle",
            display: "inline-flex",
          }}
        >
          <CopyrightIcon />
          2023 DT Meals Technologies Inc.
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        container
        alignItems="center"
        justifyCenter="center"
        direction="column"
        style={{ paddingBlock: 20 }}
      >
        <Typography
          style={{
            verticalAlign: "middle",
            display: "inline-flex",
          }}
        >
          Made with <FavoriteIcon sx={{ color: "red", marginInline: 0.3 }} /> in
          Canada
        </Typography>
      </Grid>
    </>
  );
};

export default Footer;
