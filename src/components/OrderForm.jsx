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
import axios from "axios";
import { payOrder, payOrderAccount, saveOrder } from "../api/order";
import moment from "moment";
import InfoIcon from "@mui/icons-material/Info";
import _ from "lodash";

const OrderSchema = Yup.object().shape({
  menuOpt: Yup.string().required("Required"),
  rrOpt: Yup.object()
    .shape({
      roti: Yup.number().required("Required"),
      rice: Yup.number().required("Required"),
    })
    .required("Required"),
  rsOpt: Yup.string().required("Required"),
  selPlan: Yup.object()
    .shape({
      planName: Yup.string().required(),
    })
    .required("Required"),
  prodType: Yup.object().shape({}).required("Required"),
  request: Yup.string(),
  planName: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
  sDate: Yup.date().required(),
  days: Yup.number().required("Required"),
  confNum: Yup.string().required("Required"),
  deliveryCharges: Yup.string().required("Required"),
  serviceType: Yup.string().required("Required"),
});
const OrderForm = ({
  SelID,
  tname,
  rr,
  rs,
  vegPrice,
  nvegPrice,
  products,
  logo,
  gallery,
  serviceTypes,
  interacEmail,
  selected,
  handleChange,
  handleSubmit,
}) => {
  const { user, setOpen, setLoading } = useContext(DataContext);
  const [sellerAccount, setSellerAccount] = useState();
  const [plans, setPlans] = useState([]);
  const [menuOptions, setMenuOptions] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState();
  const [rrOptions, setRrOptions] = useState([]);
  const [rsOptions, setRsOptions] = useState([]);
  const [extras, setExtras] = useState({});
  const [extrasOptions, setExtrasOptions] = useState([]);
  const [systemExtras, setSystemExtras] = useState({});
  const [total, setTotal] = useState();
  const [initial, setInitial] = useState({
    prodType: "",
    menuOpt: "",
    rrOpt: "",
    rsOpt: "",
    selPlan: "",
    request: "",
    planName: "",
    days: 0,
    deliveryCharges: "",
    price: 0,
    sDate: moment().format("YYYY-MM-DD"),
    confNum: "",
    serviceType: "Delivery",
  });
  const loadPayAccount = async () => {
    setSellerAccount(await payOrderAccount(SelID));
  };
  const reInitialize = (initial, add) => {
    setInitial(initial);
  };
  const getExtrasConfig = async () => {
    const { data } = await axios.get(
      "https://singlamanik12.github.io/tiffin-conf/extras.json"
    );
    setSystemExtras(data);
    setInitial({ ...initial, ...data });
  };
  const getTotal = (values, type) => {
    let extrastotal = 0;
    extrasOptions?.map((option) => {
      extrastotal += values[`x${option}`] * extras[option];
    });
    let total =
      extrastotal +
      parseFloat(values?.price) +
      (values?.serviceType === "Delivery"
        ? parseFloat(values.deliveryCharges)
        : 0);
    if (type === "tax") {
      return !isNaN(total) ? (total * 0.13).toFixed(2) : (0).toFixed(2);
    }
    if (type === "cost") {
      return !isNaN(total) ? total.toFixed(2) : (0).toFixed(2);
    }

    return !isNaN(total) ? (total + total * 0.13).toFixed(2) : (0).toFixed(2);
  };
  useEffect(() => {
    loadPayAccount();
    getExtrasConfig();
  }, []);
  const formik = useFormik({
    initialValues: initial,
    enableReinitialize: true,
    validationSchema: OrderSchema,
    onSubmit: async (values) => {
      console.log("MAnik");
      if (values.serviceType === "Pickup" && address) {
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
      <form enableReinitialize={true} onSubmit={formik.handleSubmit}>
        <Grid item container direction="row" style={{ padding: "8px" }}>
          <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
            <InputLabel id={"prodType"}>Select Type</InputLabel>
            <Select
              id="prodType"
              name="prodType"
              values={formik.values.prodType}
              label="Select type"
              onChange={(e) => {
                formik.setFieldValue("prodType", e.target.value);
                setPlans(e.target.value?.plans);
                setExtras([]);
                setExtrasOptions([]);
                setRrOptions([]);
                setMenuOptions([]);
                formik.setFieldValue("deliveryCharges", "");
                formik.setFieldValue("days", 0);
                formik.setFieldValue("selPlan", "");
                formik.setFieldValue("price", "");
                formik.setFieldValue("menuOpt", "");
                formik.setFieldValue("price", "");
              }}
              error={formik.touched.prodType && Boolean(formik.errors.prodType)}
            >
              {products.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option.prodName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {plans?.length > 0 && (
            <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
              <InputLabel id={"selPlan"}>Select Plan</InputLabel>
              <Select
                labelId={"selPlan"}
                id={"selPlan"}
                name={"selPlan"}
                value={formik.values.selPlan}
                label={"Select Plan"}
                onChange={(e) => {
                  setExtrasOptions([]);
                  formik.setFieldValue("menuOpt", "");
                  formik.setFieldValue("price", "");
                  formik.setFieldValue("selPlan", e.target.value);
                  setExtras(e.target.value?.extrasPrice);
                  formik.setFieldValue(
                    "deliveryCharges",
                    e.target.value?.deliveryCharges
                  );
                  formik.setFieldValue("days", e.target.value?.days);
                  setMenuOptions(e.target.value?.menuOpts);
                }}
                error={formik.touched.selPlan && Boolean(formik.errors.selPlan)}
              >
                {plans.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option?.planName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {menuOptions?.length > 0 && (
            <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
              <InputLabel id={"menuOpt"}>Select Menu</InputLabel>
              <Select
                labelId={"menuOpt"}
                id={"menuOpt"}
                name={"menuOpt"}
                value={formik.values.menuOpt}
                label={"Select Plan"}
                onChange={(e) => {
                  formik.setFieldValue("menuOpt", e.target.value);
                  formik.setFieldValue("price", e.target.value?.price);
                  setRrOptions(e.target.value?.rrOpt);
                  setExtrasOptions(e.target.value?.extrasOpt);
                  reInitialize(initial, extrasOptions);
                }}
                error={formik.touched.menuOpt && Boolean(formik.errors.menuOpt)}
              >
                {menuOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option?.menuType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {rrOptions?.length > 0 && (
            <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
              <InputLabel id={"rrOpt"}>Select roti/rice option</InputLabel>
              <Select
                labelId={"rrOpt"}
                id={"rrOpt"}
                name={"rrOpt"}
                value={formik.values.rrOpt}
                label={"Select default option"}
                onChange={(e) => {
                  formik.setFieldValue("rrOpt", e.target.value);
                }}
                style={{ fontSize: 16 }}
                error={formik.touched.rrOpt && Boolean(formik.errors.rrOpt)}
              >
                {rrOptions.map((option, index) => (
                  <MenuItem key={index} value={option} style={{ fontSize: 16 }}>
                    {Object.keys(option).map(
                      (key) =>
                        (option[key] > 0
                          ? option[key] === 1
                            ? ""
                            : option[key]
                          : " no") +
                        " " +
                        _.capitalize(key) +
                        " \\"
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Grid item xs={12} container spacing={1}>
            {extrasOptions?.length > 0 &&
              extrasOptions.map((option, index) => (
                <Grid item key={index}>
                  <TextField
                    style={{ width: 115 }}
                    id={`x${option}`}
                    name={`x${option}`}
                    label={`Extra ${_.capitalize(option)}`}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    inputProps={{ min: 0 }}
                    value={
                      formik.values[`x${option}`] <= 0
                        ? ""
                        : formik.values[`x${option}`]
                    }
                    onChange={(e) => {
                      if (e.target.value >= 0) {
                        console.log(e.target.value);
                        formik.setFieldValue(`x${option}`, e.target.value);
                      }
                    }}
                    error={
                      formik.touched[`x${option}`] &&
                      Boolean(formik.errors[`x${option}`])
                    }
                  />
                </Grid>
              ))}
          </Grid>
          <TextField
            fullWidth
            id="request"
            name="request"
            label="Additional Instructions"
            onChange={formik.handleChange}
            style={{ marginBottom: 10, marginTop: 10 }}
            error={formik.touched.request && Boolean(formik.errors.request)}
            multiline
            rows={3}
          />
          {serviceTypes?.length > 0 && (
            <FormControl fullWidth style={{ marginTop: 10, marginBottom: 10 }}>
              <InputLabel id={"serviceType"}>Select Service</InputLabel>
              <Select
                labelId={"serviceType"}
                id={"serviceType"}
                name={"serviceType"}
                value={formik.values.serviceType}
                label={"Service Type"}
                onChange={(e) => {
                  formik.setFieldValue("serviceType", e.target.value);
                }}
                error={
                  formik.touched.serviceType &&
                  Boolean(formik.errors.serviceType)
                }
              >
                {serviceTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {formik.values.serviceType !== "Pickup" && (
            <LocationSearchInput setAddress={setAddress} error={addErr} />
          )}
          <Typography variant={"h6"} style={{ marginTop: 50 }}>
            Order Summary
          </Typography>
          <Grid item xs={12} container>
            <Grid
              item
              xs={6}
              container
              direction="column"
              style={{ marginTop: 40 }}
            >
              {formik.values.selPlan?.planName && (
                <Typography>{formik.values.selPlan?.planName}</Typography>
              )}
              {formik.values.rrOpt && (
                <Typography>
                  {formik.values.rrOpt?.roti > 0
                    ? formik.values.rrOpt?.roti
                    : "no"}{" "}
                  roti &{" "}
                  {formik.values.rrOpt?.rice > 0
                    ? formik.values.rrOpt?.rice
                    : "no"}{" "}
                  rice
                </Typography>
              )}
              {extrasOptions?.map((option) => {
                return (
                  formik.values[`x${option}`] > 0 && (
                    <Typography key={option}>
                      {formik.values[`x${option}`]}
                      {" Extra " + _.capitalize(option)}
                    </Typography>
                  )
                );
              })}

              {!!formik.values.selPlan?.days && (
                <Typography>
                  Ends on - {""}
                  <span style={{ fontWeight: "bolder", fontSize: 20 }}>
                    {moment(formik.values?.sDate, "YYYY-MM-DD")
                      .add(formik.values.selPlan?.days, "days")
                      .format("YYYY-MM-DD")}
                  </span>
                </Typography>
              )}
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
                    {getTotal(formik.values, "cost")}
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
                    {getTotal(formik.values, "tax")}
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
                    {getTotal(formik.values, "")}
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} container>
            <Typography variant="h6" style={{ marginTop: 10 }}>
              Confirmation number
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            alignItems="center"
            style={{ marginBottom: 20, marginTop: 10 }}
          >
            <Typography
              variant="body1"
              style={{
                marginLeft: 10,
                alignItems: "center",
              }}
            >
              <InfoIcon color="warning" style={{ marginRight: 10 }} />
              Please interac the amount to{" "}
              <span style={{ fontWeight: "bolder" }}>{interacEmail}</span> and
              enter the confirmation number below
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
              Order
            </Button>
          )}
        </Grid>
      </form>
    </>
  );
};

export default OrderForm;
