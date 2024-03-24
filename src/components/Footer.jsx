import React from "react";
import { Grid, Typography, Link, Divider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
function Footer() {
  return (
    <footer>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ marginBlock: 20 }}
      >
        <Grid
          item
          sm={12}
          md={6}
          justifyContent="center"
          alignItems="center"
          container
        >
          <Typography
            fontSize={25}
            fontWeight="bold"
            style={{ paddingBottom: 20 }}
          >
            <span style={{ color: "#162328" }}>DT</span>{" "}
            <span style={{ color: "#9f6ba0" }}>Meals</span>
          </Typography>
        </Grid>
        <Grid item sm={12} md={6}>
          <Typography variant="body2" align="center">
            <Link href="https://seller.dtmeals.com">Become a seller</Link> |{" "}
            <Link href="https://www.privacypolicygenerator.info/live.php?token=0eMserBhjszuOaDaPGat1FOf0DRscx4u">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link href="https://www.privacypolicygenerator.info/live.php?token=0eMserBhjszuOaDaPGat1FOf0DRscx4u">
              Terms and Conditions
            </Link>
          </Typography>
          <Typography variant="body2" align="center">
            For customer service, please email{" "}
            <Link href="mailto:support@dtmeals.com">support@dtmeals.com</Link>
          </Typography>
          <Typography variant="body2" align="center">
            &copy; 2024 DT Meals Technologies Inc.
          </Typography>
          <Typography variant="body2" align="center">
            Made with <FavoriteIcon sx={{ color: "red", marginInline: 0.3 }} />{" "}
            in Canada
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
