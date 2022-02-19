import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ServiceEditor from "./Seller/ServiceEditor";
import MenuSelection from "./MenuSelection";
import Loading from "./../shared/Loading";
import FirebaseUI from "./FirebaseUI";
import Orders from "./Seller/Orders";
import SideBar from "./SideBar";
import Onboard from "./Seller/Onboard";
const ServiceRoutes = () => {
  return (
    <Routes>
      <Route path="/edit" element={<ServiceEditor />} />
      <Route path="/menu" element={<MenuSelection />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/test" element={<Onboard />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default ServiceRoutes;
