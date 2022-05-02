import React from "react";
import { Routes, Route } from "react-router-dom";
import Search from "./Search";
import MenuSelection from "./MenuSelection";
import Loading from "./../shared/Loading";
import Home from "./Home";

const ServiceRoutes = () => {
  return (
    <Routes>
      <Route path="/menu/:id" element={<MenuSelection />} />
      <Route path="/services/:city" element={<Search />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default ServiceRoutes;
