import React from "react";
import { Typography, Grid, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "./Carousel";
const ServiceOutline = ({ service }) => {
  const { tname, vegPrice, nvegPrice, overview, _id } = service;
  let navigate = useNavigate();
  const text = overview;

  return (
    <>
      <Grid
        container
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/menu/${_id}`)}
      >
        <Grid item xs={12} style={{ marginBottom: 10 }}>
          <img
            style={{ width: "100%", height: "200px" }}
            src={service.pics[0].url}
            alt="logo"
          />
        </Grid>
        <Grid item xs={12} style={{ padding: 10 }}>
          <Typography variant="h5">{tname}</Typography>
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
        <Grid item xs={12} style={{ color: "#808080", paddingInline: 10 }}>
          <Typography variant="caption">
            {text.substring(0, 190)}
            {text.length > 190 && "..."}
          </Typography>
        </Grid>

        {/* <Grid item xs={12} container style={{ marginTop: "50px" }}>
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
            Veg - CA$ {vegPrice}
          </Typography>{" "}
          {nvegPrice !== 0 && (
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
              Non-Veg - CA$ {nvegPrice}
            </Typography>
          )}
        </Grid> */}

        <Grid
          item
          xs={12}
          container
          justifyContent="right"
          style={{ paddingTop: 2, cursor: "pointer" }}
          onClick={() => navigate("/menu")}
        >
          <ArrowForwardIcon />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider style={{ marginBlock: 10 }} />
      </Grid>
    </>
  );
};

export default ServiceOutline;
