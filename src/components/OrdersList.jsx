import { Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../api/context";
import { getPastOrders } from "../api/order";
import Layout from "../shared/Layout";
import Order from "./Order";
const OrdersList = () => {
  const { user, setLoading } = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    setLoading(true);
    setOrders(await getPastOrders(user.PhoneNumber));
    setLoading(false);
  };
  useEffect(() => {
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
