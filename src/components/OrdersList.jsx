import { Typography, Grid, Divider } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../api/context";
import { getPastOrders, getPendingOrders } from "../api/order";
import Layout from "../shared/Layout";
import axios from "axios";
import _ from "lodash";
const OrdersList = () => {
  const { user, setLoading } = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [systemExtras, setSystemExtras] = useState([]);
  const getOrders = async () => {
    if (user.CusID) {
      setLoading(true);
      const { data } = await axios.get(
        "https://singlamanik12.github.io/tiffin-conf/extras.json"
      );
      setSystemExtras(Object.keys(data));
      setPendingOrders(await getPendingOrders({ CusID: user.CusID }));
      setOrders(await getPastOrders(user.CusID));
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrders();
  }, [user]);
  return (
    <Layout>
      <Grid item container direction="row" style={{ padding: "8px" }}>
        {/* {pendingOrders.length > 0 && (
          <Typography
            style={{ marginBottom: 20, fontSize: "20px", fontWeight: "bold" }}
          >
            Pending Orders
          </Typography>
        )} */}
        {pendingOrders?.length > 0 &&
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
                  {order?.selPlan?.planName && (
                    <Typography>{order.prodType?.prodName}</Typography>
                  )}
                  {order?.selPlan?.planName && (
                    <Typography>{order.selPlan?.planName}</Typography>
                  )}

                  <Typography>{order.menuOpt.menuType}</Typography>

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
                        {order.cost}
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
                        {order.totalPrice}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ marginBlock: 5 }}>
                {order?.request && (
                  <Typography>
                    <span>
                      <span style={{ fontWeight: "bolder", fontSize: 20 }}>
                        Additional Request
                      </span>{" "}
                      - {order?.request}
                    </span>
                  </Typography>
                )}
              </Grid>
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
              <Grid item xs={12} style={{ marginBlock: 5 }}>
                <Divider style={{ color: "black", height: "1px" }} />
              </Grid>
            </>
          ))}
        {/* {orders?.length > 0 && (
          <Grid item xs={12} style={{ marginBlock: 5 }}>
            <Typography
              style={{ marginBlock: 20, fontSize: "20px", fontWeight: "bold" }}
            >
              Past Orders
            </Typography>
          </Grid>
        )} */}
        {orders?.length > 0 &&
          orders.map((order) => (
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

                  <Typography>{order.menuOpt.menuType}</Typography>

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
                        {order.cost}
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
                        {order.totalPrice}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ marginBlock: 5 }}>
                <Typography>
                  <span>{order?.request}</span>
                </Typography>
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
      </Grid>
    </Layout>
  );
};

export default OrdersList;
