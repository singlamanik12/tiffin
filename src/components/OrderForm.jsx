import React, { useContext, useEffect, useState } from "react";
import OptionSelect from "./OptionSelect";
import { Button, Grid, Typography } from "@mui/material";
import LocationSearchInput from "./LocationSearchInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import DataContext from "../api/context";
import { payOrder, payOrderAccount, saveOrder } from "../api/order";
const OrderSchema = Yup.object().shape({
  menuOpt: Yup.string().required("Required"),
  rrOpt: Yup.string().required("Required"),
  rsOpt: Yup.string().required("Required"),
});
const OrderForm = ({
  SelID,
  tname,
  menuOptions,
  rr,
  rs,
  vegPrice,
  nvegPrice,
  selected,
  handleChange,
  handleSubmit,
}) => {
  const { user, setOpen, setLoading } = useContext(DataContext);
  const [sellerAccount, setSellerAccount] = useState();
  const loadPayAccount = async () => {
    setSellerAccount(await payOrderAccount(SelID));
    console.log(sellerAccount);
  };
  useEffect(() => {
    loadPayAccount();
  }, []);
  const formik = useFormik({
    initialValues: {
      menuOpt: "",
      rrOpt: "",
      rsOpt: "",
    },

    validationSchema: OrderSchema,
    onSubmit: async (values) => {
      if (address) {
        if (user) {
          setLoading(true);
          let price = 0;
          values.address = address;
          values.sellerAccount = sellerAccount;
          console.log(values);
          if (values.menuOpt === "Veg Menu") {
            price = vegPrice;
          } else {
            price = nvegPrice;
          }
          values.price = price;
          const result = await payOrder({
            tname: tname,
            price: price * 100,
            sellerAccount: sellerAccount,
          });
          values.checkout = result.data;
          values.ch_id = result.data.id;
          values.SelID = SelID;
          values.tname = tname;
          values = { ...values, ...user };
          const data = await saveOrder(values);
          console.log(data);
          setLoading(false);
          window.location.href = result.data.url;
        } else {
          setOpen(true);
        }
      } else {
        setAddErr(true);
      }
    },
  });
  const [address, setAddress] = useState("");
  const [addErr, setAddErr] = useState(false);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid item container direction="row">
          <OptionSelect
            selected={formik.values.menuOpt}
            id="menu"
            name="menuOpt"
            options={menuOptions}
            label="Select your menu"
            onChange={formik.handleChange}
            error={formik.touched.menuOpt && Boolean(formik.errors.menuOpt)}
          />

          <OptionSelect
            selected={formik.values.rrOpt}
            id="rr"
            name="rrOpt"
            options={rr}
            label="Select roti/rice option"
            onChange={formik.handleChange}
            style={{ marginTop: 20 }}
            error={formik.touched.rrOpt && Boolean(formik.errors.rrOpt)}
          />

          <OptionSelect
            selected={formik.values.rsOpt}
            options={rs}
            id="rs"
            name="rsOpt"
            label="Select salad/raita option"
            onChange={formik.handleChange}
            style={{ marginTop: 20, marginBottom: 20 }}
            error={formik.touched.rsOpt && Boolean(formik.errors.rsOpt)}
          />
          <LocationSearchInput setAddress={setAddress} error={addErr} />

          {!!!sellerAccount ? (
            <Typography color="secondary">
              Seller currently doesn't accept any orders
            </Typography>
          ) : (
            <Button
              variant="contained"
              type="submit"
              disabled={sellerAccount === undefined}
              fullWidth
              style={{ marginTop: 20 }}
            >
              Place Order
            </Button>
          )}
        </Grid>
      </form>
    </>
  );
};

export default OrderForm;
