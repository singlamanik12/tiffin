import React, { useState, useContext, useEffect } from "react";
import { Divider, Grid, Typography, Button } from "@mui/material";
import OptionTemplate from "./OptionTemplate";
import OptionSelect from "./OptionSelect";
import Layout from "../shared/Layout";
import DataContext from "../api/context";
import Loading from "./../shared/Loading";
import MdPhone from "@mui/icons-material/Phone";
import Chip from "@mui/material/Chip";
import { getSellerById } from "../api/menu";
import OrderForm from "./OrderForm";
import ImageCarousel from "./Carousel";

export default function MenuChoice({ values }) {
  const { setOpen } = useContext(DataContext);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState({});
  const [phNum, setPhNum] = useState();
  const initialValues = JSON.parse(localStorage.getItem("selected"));

  useEffect(() => {
    setDone(true);
  }, []);

  const {
    SelID,
    tname,
    overview,
    veg,
    nveg,
    rrOpt,
    rsOpt,
    vegPrice,
    nvegPrice,
    products,
    logo,
    gallery,
    serviceTypes,
    city,
    interacEmail,
  } = values;
  const getPhoneNumber = async () => {
    const { data } = await getSellerById(SelID);
    setPhNum(data.PhoneNumber);
  };
  useEffect(() => getPhoneNumber(), [SelID]);
  const overviewHeading = "What's special about us";
  const rr = rrOpt.split("/").filter((n) => n);
  const rs = rsOpt.split("/").filter((n) => n);
  const menuOptions =
    nveg === "NA" ? ["Veg Menu"] : ["Veg Menu", "Non-Veg Menu"];
  const handleChange = (event) => {
    setSelected(
      Object.assign({}, selected, { [event.target.name]: event.target.value })
    );
  };
  const handleSubmit = () => {
    localStorage.setItem("selected", JSON.stringify(selected));
  };
  return !done ? (
    <Loading />
  ) : (
    <Layout>
      <Grid container direction="row">
        <Grid
          item
          xs={12}
          style={{ marginInline: 10, marginBlock: 5 }}
          container
          alignItems="center"
        >
          <img
            style={{ height: 50, width: 50, borderRadius: 20, marginRight: 5 }}
            src={logo}
            alt="logo"
          />
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            {tname}
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ marginBlock: 10 }}>
          {values?.pics && <ImageCarousel pics={values.pics} />}
        </Grid>
        <Grid item xs={12} style={{ marginBottom: 20, marginTop: 20 }}>
          <Divider>
            <Typography
              variant="h6"
              style={{
                backgroundColor: "#ffd0d5",
                paddingInline: 10,
                borderRadius: 20,
              }}
            >
              {overviewHeading}
            </Typography>
          </Divider>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ marginLeft: 10 }}
          container
          alignItems={true}
          justifyContent={true}
        >
          <Typography align="center">{overview}</Typography>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: 20, marginTop: 20 }}>
          <Divider>
            <Typography
              variant="h6"
              style={{
                backgroundColor: "#ffd0de",
                paddingInline: 10,
                borderRadius: 20,
              }}
            >
              Menu Options
            </Typography>
          </Divider>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          {products.map((product) => (
            <>
              <Grid item xs={12} container justifyContent="center">
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bolder", marginBottom: 5 }}
                >
                  {product?.prodName}
                </Typography>
              </Grid>
              <Grid item xs={12} container justifyContent="center">
                <Typography style={{ marginBottom: 10 }}>
                  {product?.description}
                </Typography>
              </Grid>
            </>
          ))}
        </Grid>
        {/* <OptionTemplate
          data={veg}
          type="Veg Menu"
          color="#00e600"
          price={vegPrice}
        />
        <OptionTemplate
          data={nveg}
          type="Non-Veg Menu"
          color="orange"
          price={nvegPrice}
        /> */}
        <Grid item xs={12} style={{ marginBottom: 20, marginTop: 20 }}>
          <Divider>
            <Typography
              variant="h6"
              style={{
                backgroundColor: "#ffd0de",
                paddingInline: 10,
                borderRadius: 20,
              }}
            >
              Cities Available
            </Typography>
          </Divider>
        </Grid>
        {city.map((item) => (
          <Chip
            style={{ marginRight: 10 }}
            label={<Typography>{item}</Typography>}
          />
        ))}
        <Grid item xs={12} style={{ marginTop: 20, marginBottom: 20 }}>
          <Divider>
            <Typography
              variant="h6"
              style={{
                backgroundColor: "#ffd0de",
                paddingInline: 10,
                borderRadius: 20,
              }}
            >
              Place your order
            </Typography>
          </Divider>
        </Grid>
      </Grid>
      <OrderForm
        SelID={SelID}
        tname={tname}
        menuOptions={menuOptions}
        rr={rr}
        rs={rs}
        products={products}
        logo={logo}
        gallery={gallery}
        serviceTypes={serviceTypes}
        handleChange={handleChange}
        selected={selected}
        handleSubmit={handleSubmit}
        setOpen={setOpen}
        vegPrice={vegPrice}
        nvegPrice={nvegPrice}
        interacEmail={interacEmail}
      />
    </Layout>
  );
}
