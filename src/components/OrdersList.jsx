import { Typography, Grid, Divider } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../api/context";
import { getPastOrders, getPendingOrders } from "../api/order";
import Layout from "../shared/Layout";
import Order from "./Order";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
const OrdersList = () => {
  const { user, setLoading } = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [systemExtras, setSystemExtras] = useState([]);
  const getOrders = async () => {
    setLoading(true);
    console.log(user);
    const { data } = await axios.get(
      "https://singlamanik12.github.io/tiffin-conf/extras.json"
    );
    setSystemExtras(Object.keys(data));
    console.log(data);
    setPendingOrders(await getPendingOrders({ CusID: user.CusID }));
    console.log(pendingOrders);
    // setOrders(await getPastOrders(user.PhoneNumber));
    setLoading(false);
  };
  useEffect(() => {
    getOrders();
  }, [user]);
  return (
    <Layout>
      <Grid item container direction="row" style={{ padding: "8px" }}>
        <Typography
          style={{ marginBottom: 20, fontSize: "20px", fontWeight: "bold" }}
        >
          Pending Orders
        </Typography>
        {pendingOrders &&
          pendingOrders.map((order) => (
            <>
              {" "}
              <Grid item xs={12} container>
                <Grid
                  item
                  xs={6}
                  container
                  direction="column"
                  style={{ marginTop: 20 }}
                >
                  <Typography style={{ fontWeight: "bold" }}>
                    {order?.tname}
                  </Typography>
                  {order.selPlan?.planName && (
                    <Typography>{order.selPlan?.planName}</Typography>
                  )}
                  {order.rrOpt && (
                    <Typography>
                      {order.rrOpt?.roti > 0 ? order.rrOpt?.roti : "no"} roti &{" "}
                      {order.rrOpt?.rice > 0 ? order.rrOpt?.rice : "no"} rice
                    </Typography>
                  )}

                  {systemExtras?.map((key) => {
                    return (
                      parseInt(order[key]) > 0 && (
                        <Typography key={key}>
                          {order[key]}
                          {" Extra " + _.capitalize(key.substring(1))}
                        </Typography>
                      )
                    );
                  })}

                  {/* {!!order.selPlan?.days && (
                <Grid style={{ backgroundColor: "whitesmoke" }}>
                  <Typography>
                    Ends on
                    <Typography style={{ fontWeight: "bolder", fontSize: 20 }}>
                      {moment(order?.sDate, "YYYY-MM-DD")
                        .add(order.selPlan?.days, "days")
                        .format("YYYY-MM-DD")}
                    </Typography>
                  </Typography>
                </Grid>
              )} */}
                </Grid>
                <Grid item xs={6}>
                  <Grid
                    item
                    xs={12}
                    container
                    justifyContent="right"
                    style={{ marginTop: 40 }}
                  >
                    <Typography>
                      Cost{" "}
                      <span
                        style={{
                          fontWeight: "bolder",
                          marginLeft: 20,
                          fontSize: 17,
                        }}
                      >
                        <span style={{ marginRight: 2 }}>C$</span>
                        {order.price}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    justifyContent="right"
                    style={{ marginTop: 10 }}
                  >
                    <Typography>
                      Tax{" "}
                      <span
                        style={{
                          fontWeight: "bolder",
                          marginLeft: 20,
                          fontSize: 17,
                        }}
                      >
                        <span style={{ marginRight: 2 }}>C$</span>
                        {order.tax}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} container justifyContent="right">
                    <div
                      style={{
                        width: "112px",
                        height: "7px",
                        position: "relative",
                        borderBottom: "1px solid #000000",
                      }}
                    ></div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    justifyContent="right"
                    style={{ marginTop: 10 }}
                  >
                    <Typography>
                      Total{" "}
                      <span
                        style={{
                          fontWeight: "bolder",
                          marginLeft: 20,
                          fontSize: 25,
                        }}
                      >
                        <span style={{ marginRight: 2 }}>C$</span>
                        {order.subTotal}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {!!order.selPlan?.days && (
                <Grid
                  style={{
                    backgroundColor: "whitesmoke",
                    padding: 10,
                    borderRadius: 20,
                  }}
                >
                  <Typography>
                    <span style={{ fontWeight: "bolder", fontSize: 20 }}>
                      {order.sDate + " - " + order.eDate}
                    </span>
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} style={{ marginBlock: 5 }}>
                <Divider style={{ color: "black", height: "1px" }} />
              </Grid>
            </>
          ))}
        {orders && orders.map((order) => <Order order={order} />)}
      </Grid>
    </Layout>
  );
};

export default OrdersList;
