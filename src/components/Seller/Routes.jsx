import React from "react";
import { Routes, Route } from "react-router-dom";
import SellerDash from "./SellerDash";
const SellerRoutes = () => {
  return (
    <Routes>
      <Route path="/seller/dash" element={<SellerDash />} />
    </Routes>
  );
};

export default SellerRoutes;
