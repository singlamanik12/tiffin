import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
export default function ImageCarousel({ pics }) {
  return (
    <Carousel variant="dark">
      {pics.map((pic, index) => (
        <Carousel.Item variant="#808080">
          <img
            className="d-block w-100"
            src={pic.url}
            alt="DT Meals"
            style={{
              height: "250px",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
