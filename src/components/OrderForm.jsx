import React, { useContext, useEffect, useState } from "react";
import OptionSelect from "./OptionSelect";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import LocationSearchInput from "./LocationSearchInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import DataContext from "../api/context";
import { payOrder, payOrderAccount, saveOrder } from "../api/order";
import moment from "moment";
import momentBusiness from "moment-business-days";

const OrderSchema = Yup.object().shape({
  menuOpt: Yup.string().required("Required"),
  rrOpt: Yup.string().required("Required"),
  rsOpt: Yup.string().required("Required"),
  selPlan: Yup.object().required("Required"),
  add_ons: Yup.string(),
  planName: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
  sDate: Yup.date().required(),
  confNum: Yup.string().required("Required"),
});
const OrderForm = ({
  SelID,
  tname,
  rr,
  rs,
  vegPrice,
  nvegPrice,
  products,
  interacEmail,
  selected,
  handleChange,
  handleSubmit,
}) => {
  const { user, setOpen, setLoading } = useContext(DataContext);
  const [sellerAccount, setSellerAccount] = useState();
  const [plan, setPlan] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState();
  const loadPayAccount = async () => {
    setSellerAccount(await payOrderAccount(SelID));
  };
  let menuOptions = [];
  for (var key in products) {
    if (products[key].plans.length > 0) {
      menuOptions.push(key);
    }
  }
  useEffect(() => {
    console.log(products);
    loadPayAccount();
  }, []);
  const formik = useFormik({
    initialValues: {
      menuOpt: "",
      rrOpt: "",
      rsOpt: "",
      selPlan: {},
      add_ons: "",
      planName: "",
      price: "",
      sDate: moment().format("YYYY-MM-DD"),
      confNum: "",
    },

    validationSchema: OrderSchema,
    onSubmit: async (values) => {
      if (address) {
        if (user) {
          setLoading(true);
          let price = 0;
          values.address = address;
          values.sellerAccount = sellerAccount;
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
          values.paid = price - 0.05 * price;
          values = { ...values, ...user };
          const data = await saveOrder(values);
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
            onChange={(e) => {
              formik.handleChange(e);
              setPlan(products[e.target.value].plans);
              console.log(products[e.target.value].plans);
            }}
            error={formik.touched.menuOpt && Boolean(formik.errors.menuOpt)}
          />
          {plan.length > 0 && (
            <FormControl fullWidth style={{ marginTop: 20 }}>
              <InputLabel id={"selPlan"}>Select Plan</InputLabel>
              <Select
                labelId={"selPlan"}
                id={"selPlan"}
                name={"selPlan"}
                value={formik.values.selPlan}
                label={"Select Plan"}
                onChange={(e) => {
                  formik.setFieldValue("selPlan", e.target.value);
                  formik.setFieldValue("planName", e.target.value.planName);
                  formik.setFieldValue(
                    "price",
                    e.target.value.price + e.target.value.deliveryCharges
                  );
                }}
                error={
                  formik.touched.selPlan &&
                  Boolean(formik.errors.planName) &&
                  Boolean(formik.errors.price)
                }
              >
                {plan.map((option) => (
                  <MenuItem value={option}>{option.planName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {!!formik.values.selPlan?.days && (
            <Typography
              variant="h6"
              style={{
                backgroundColor: "#ffd0de",
                paddingInline: 10,
                borderRadius: 20,
                marginTop: 20,
              }}
            >
              Amount - C${formik.values.price}
            </Typography>
          )}
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

          <TextField
            fullWidth
            style={{ marginBottom: 20 }}
            id="sDate"
            name="sDate"
            label="Start Date"
            type="date"
            variant="outlined"
            defaultValue={momentBusiness()
              .nextBusinessDay()
              .format("YYYY-MM-DD")
              .toString()}
            value={formik.values?.sDate}
            onChange={formik.handleChange}
            error={formik.touched.sDate && Boolean(formik.errors.sDate)}
            helperText={formik.touched.sDate && formik.errors.sDate}
          />

          {!!formik.values.selPlan?.days && (
            <Typography
              variant="h6"
              style={{
                backgroundColor: "#ffd0de",
                paddingInline: 10,
                borderRadius: 20,
                marginBottom: 20,
              }}
            >
              End Date -{" "}
              {momentBusiness(formik.values?.sDate, "YYYY-MM-DD")
                .businessAdd(formik.values.selPlan?.days)
                .format("YYYY-MM-DD")
                .toString()}
            </Typography>
          )}
          <TextField
            fullWidth
            id="add_ons"
            name="add_ons"
            label="Additional Instructions"
            onChange={formik.handleChange}
            style={{ marginBottom: 20 }}
            error={formik.touched.add_ons && Boolean(formik.errors.add_ons)}
            multiline
            rows={3}
          />
          <LocationSearchInput setAddress={setAddress} error={addErr} />
          <Grid item xs={12} container>
            <Typography variant="h6" style={{ marginTop: 10 }}>
              Confirmation number
            </Typography>
          </Grid>
          <Grid item xs={12} container>
            <Typography
              variant="body1"
              style={{ marginBottom: 20, marginTop: 10 }}
            >
              Please interac the amount to {interacEmail} and enter the
              confirmation number below
            </Typography>
          </Grid>
          <TextField
            fullWidth
            id="confNum"
            name="confNum"
            label="Confirmation number"
            onChange={formik.handleChange}
            style={{ marginBottom: 20 }}
            error={formik.touched.confNum && Boolean(formik.errors.confNum)}
          />
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
