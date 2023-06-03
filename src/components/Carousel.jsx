import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
export default function ImageCarousel({ pics }) {
  return (
    <Carousel
      variant="light"
      style={{ paddingInline: 55 }}
      nextIcon={
        <IconButton style={{ color: "white", backgroundColor: "black" }}>
          {" "}
          <ArrowForwardIosIcon fontSize="large" style={{ fontSize: 25 }} />
        </IconButton>
      }
      prevIcon={
        <IconButton style={{ color: "white", backgroundColor: "black" }}>
          {" "}
          <ArrowBackIosNewIcon fontSize="large" style={{ fontSize: 25 }} />
        </IconButton>
      }
    >
      {pics.map((pic, index) => (
        <Carousel.Item variant="black">
          <img
            className="d-block w-100"
            src={pic.url}
            alt="DT Meals"
            style={{
              height: "auto",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
