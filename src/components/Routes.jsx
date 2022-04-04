import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import MenuSelection from "./MenuSelection";
import Loading from "./../shared/Loading";
import FirebaseUI from "./FirebaseUI";
import SideBar from "./SideBar";

const ServiceRoutes = () => {
  return (
    <Routes>
      <Route path="/menu" element={<MenuSelection />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default ServiceRoutes;
