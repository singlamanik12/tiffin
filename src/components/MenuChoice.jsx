import React, { useState, useContext, useEffect } from "react";
import { Divider, Grid, Typography, Button } from "@mui/material";
import OptionTemplate from "./OptionTemplate";
import OptionSelect from "./OptionSelect";
import Layout from "../shared/Layout";
import DataContext from "../api/context";
import Loading from "./../shared/Loading";
import MdPhone from "@mui/icons-material/Phone";
import Chip from "@mui/material/Chip";
export default function MenuChoice() {
  const { setOpen } = useContext(DataContext);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState({});
  const initialValues = JSON.parse(localStorage.getItem("selected"));

  useEffect(() => {
    setSelected(initialValues);
    setDone(true);
  }, [initialValues]);
  const menuOptions = ["Veg Menu", "Non-Veg Menu"];
  const { overview, veg, nveg, rrOpt, rsOpt, phoneNo, vegPrice, nvegPrice } =
    JSON.parse(localStorage.getItem("value"));
  const overviewHeading = "What's special about us";
  const rr = rrOpt.split("/").filter((n) => n);
  const rs = rsOpt.split("/").filter((n) => n);
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
        <Grid item xs={12} style={{ marginInline: 20, marginBlock: 5 }}>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Amritsari Tiffin Service
          </Typography>
          <Chip
            icon={<MdPhone />}
            label={<Typography>+1{phoneNo}</Typography>}
          />
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
        <Grid item xs={12} container alignItems={true} justifyContent={true}>
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
        <Grid item xs={12}></Grid>
        <OptionTemplate
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
        />
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

        <OptionSelect
          selected={selected?.menu}
          id="menu"
          options={menuOptions}
          label="Select your menu"
          onChange={handleChange}
        />

        <OptionSelect
          selected={selected?.rr}
          id="rr"
          options={rr}
          label="Select roti/rice option"
          onChange={handleChange}
          style={{ marginTop: 20 }}
        />

        <OptionSelect
          selected={selected?.rs}
          options={rs}
          id="rs"
          label="Select salad/raita option"
          onChange={handleChange}
          style={{ marginTop: 20 }}
        />

        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
            handleSubmit();
          }}
          fullWidth
          style={{ marginTop: 20 }}
        >
          Place Order
        </Button>
      </Grid>
    </Layout>
  );
}
