import { Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../api/context";
import { getPastOrders } from "../api/order";
import Layout from "../shared/Layout";
import Order from "./Order";
const OrdersList = () => {
  const { user } = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    console.log(user.PhoneNumber);
    setOrders(await getPastOrders(user.PhoneNumber));
  };
  useEffect(() => {
    console.log("Manik");
    getOrders();
  }, [user]);
  return (
    <Layout>
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        Your Orders
      </Typography>

      {orders && orders.map((order) => <Order order={order} />)}
    </Layout>
  );
};

export default OrdersList;
