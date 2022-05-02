import React, { useContext, useState } from "react";
import OptionSelect from "./OptionSelect";
import { Button, Grid } from "@mui/material";
import LocationSearchInput from "./LocationSearchInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import DataContext from "../api/context";
const OrderSchema = Yup.object().shape({
  menuOpt: Yup.string().required("Required"),
  rrOpt: Yup.string().required("Required"),
  rsOpt: Yup.string().required("Required"),
});
const OrderForm = ({
  menuOptions,
  rr,
  rs,
  selected,
  handleChange,
  handleSubmit,
}) => {
  const { user, setOpen } = useContext(DataContext);
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
          values.address = address;
          console.log(values);
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
          <Button
            variant="contained"
            type="submit"
            fullWidth
            style={{ marginTop: 20 }}
          >
            Place Order
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default OrderForm;
