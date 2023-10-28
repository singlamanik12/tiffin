import React from "react";
import { Routes, Route } from "react-router-dom";
import Search from "./Search";
import MenuSelection from "./MenuSelection";
import Loading from "./../shared/Loading";
import Home from "./Home";
import OrdersList from "./OrdersList";
import Success from "./Success";
import Failed from "./Failed";

const ServiceRoutes = () => {
  return (
    <Routes>
      <Route path="/menu/:id" element={<MenuSelection />} />
      <Route path="/services/:city" element={<Search />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/orders" element={<OrdersList />} />
      <Route path="/success" element={<Success />} />
      <Route path="/failed" element={<Failed />} />
      <Route path="/:code" element={<MenuSelection />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default ServiceRoutes;
