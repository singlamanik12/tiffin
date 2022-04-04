import React from "react";
import { Typography, Grid, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
const ServiceOutline = () => {
  let navigate = useNavigate();
  return (
    <>
      <Grid container style={{ padding: 10 }}>
        <Grid item xs={12}>
          <Typography variant="h5">Amritsari Tiffin Service</Typography>
        </Grid>
        {/* <Grid
        item
        xs={12}
        style={{
          backgroundColor: "#bc5cf7",
          color: "white",
          padding: "2px",
          borderRadius: "20px",
          textAlign: "center",
          marginTop: 10,
        }}
      >
        <Typography variant="body1">
          We provide sweets on every friday included.
        </Typography>
      </Grid> */}
        <Grid item xs={12} style={{ marginTop: 10, color: "#bc5cf7" }}>
          <Typography variant="body1">
            We provide both vegetarian and non vegetarian tiffin service from
            Mon - Fri.
          </Typography>
        </Grid>
        <Grid item xs={12} container style={{ marginTop: "50px" }}>
          <Grid item xs={8} container>
            <Typography
              style={{
                fontSize: 17,
                color: "white",
                backgroundColor: "#00e600",
                paddingInline: 10,
                paddingBlock: 2,
                borderRadius: 20,
              }}
            >
              Veg - CA$ 165
            </Typography>{" "}
            <Typography
              style={{
                fontSize: 17,
                color: "white",
                backgroundColor: "orange",
                paddingInline: 10,
                paddingBlock: 2,
                borderRadius: 20,
                marginLeft: 10,
              }}
            >
              Non-Veg - CA$ 185
            </Typography>{" "}
          </Grid>

          <Grid
            item
            xs={4}
            container
            justifyContent="right"
            style={{ paddingTop: 2, color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/menu")}
          >
            <Typography>Menu </Typography>
            <ArrowForwardIcon />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider light style={{ marginBlock: 10 }} />
      </Grid>
    </>
  );
};

export default ServiceOutline;
