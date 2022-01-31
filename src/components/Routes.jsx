import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ServiceEditor from "./ServiceEditor";
import MenuSelection from "./MenuSelection";
import Loading from "./../shared/Loading";
import FirebaseUI from "./FirebaseUI";
const ServiceRoutes = () => {
  return (
    <Routes>
      <Route path="/edit" element={<ServiceEditor />} />
      <Route path="/menu" element={<MenuSelection />} />
      <Route path="/test" element={<Loading />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default ServiceRoutes;
