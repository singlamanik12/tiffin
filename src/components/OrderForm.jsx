import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  Snackbar,
  Alert,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";
import LocationSearchInput from "./LocationSearchInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import DataContext from "../api/context";
import axios from "axios";
import {
  payOrder,
  payOrderAccount,
  saveOnlineOrder,
  saveOrder,
} from "../api/order";
import moment from "moment";
import InfoIcon from "@mui/icons-material/Info";
import _ from "lodash";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { getPaymentConfig } from "../api/payment";
import ServiceFeesDialog from "./ServiceFeesDialog";
const OrderSchema = Yup.object().shape({
  menuOpt: Yup.object().shape({}).required("Required"),
  rrOpt: Yup.object().shape({}).required("Required"),
  selPlan: Yup.object().shape({}).required("Required"),
  prodType: Yup.object().shape({}).required("Required"),
  request: Yup.string(),
  price: Yup.string().required("Required"),
  sDate: Yup.date().required("Required"),
  eDate: Yup.date().required("Required"),
  confNum: Yup.string().required("Required"),
  deliveryCharges: Yup.string().required("Required"),
  serviceOpt: Yup.string().required("Required"),
  paymentMode: Yup.string().required("Required"),
});
const OrderForm = ({
  SelID,
  tname,
  vegPrice,
  nvegPrice,
  products,
  serviceTypes,
  interacEmail,
  notifyEmail,
  delArea,
  isVerified,
  delAreaNote,
  paymentModesEnabled,
  serviceFees = "0",
}) => {
  const { user, setOpen, setLoading } = useContext(DataContext);
  const [sellerAccount, setSellerAccount] = useState();
  const [coord, setCoord] = useState();
  const [plans, setPlans] = useState([]);
  const [menuOptions, setMenuOptions] = useState([]);
  const [rrOptions, setRrOptions] = useState([]);

  const [extras, setExtras] = useState({});
  const [extrasOptions, setExtrasOptions] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [paymentMethodChoose, setPaymentMethodChoose] = useState("");
  const [defaultPayment, setDefaultPayment] = useState("");
  const [systemExtras, setSystemExtras] = useState({});
  const [snack, setSnack] = useState(false);
  const [openSFDialog, setOpenSFDialog] = useState(false);
  const [initial, setInitial] = useState({
    prodType: "",
    menuOpt: "",
    rrOpt: "",
    selPlan: "",
    request: "",
    days: 0,
    deliveryCharges: "",
    sDate: "",
    confNum: "N/A",
    serviceOpt: "Delivery",
    paymentMode: "",
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
    let payMode;
    if (paymentModesEnabled.includes("card")) {
      payMode = "card";
      setDefaultPayment("card");
    }
    setInitial({ ...initial, ...data, ...{ paymentMode: payMode } });
  };
  const getTotal = (values, type) => {
    let extrastotal = 0;
    extrasOptions?.map((option) => {
      extrastotal += values[`x${option}`] * extras[option];
    });
    let total =
      extrastotal +
      parseFloat(values?.price) +
      (values?.serviceOpt === "Delivery"
        ? parseFloat(values.deliveryCharges)
        : 0);
    if (values?.paymentMode === "card") {
      total = total + (total * parseFloat(serviceFees)) / 100;
    }
    // if (total === subTotal && total !== 0) {
    //   setCost({
    //     subTotal: !isNaN(total) ? total.toFixed(2) : (0).toFixed(2),
    //     tax: !isNaN(total) ? (total * 0.13).toFixed(2) : (0).toFixed(2),
    //     price: !isNaN(total)
    //       ? (total + total * 0.13).toFixed(2)
    //       : (0).toFixed(2),
    //   });
    //   setSubTotal(total);
    // }
    if (type === "tax") {
      return !isNaN(total) ? (total * 0.13).toFixed(2) : (0).toFixed(2);
    }
    if (type === "cost") {
      return !isNaN(total) ? total.toFixed(2) : (0).toFixed(2);
    }
    return !isNaN(total) ? (total + total * 0.13).toFixed(2) : (0).toFixed(2);
  };
  const getPaymentOptions = async () => {
    const { data } = await getPaymentConfig(paymentModesEnabled);
    setPaymentOptions(data);
  };
  useEffect(() => {
    loadPayAccount();
    getExtrasConfig();
    getPaymentOptions();
  }, []);
  const formik = useFormik({
    initialValues: initial,
    enableReinitialize: true,
    validationSchema: OrderSchema,
    onSubmit: async (values) => {
      if (
        values.serviceOpt === "Pickup" ||
        (address && address === selectedAdd)
      ) {
        if (user) {
          setLoading(true);
          if (values.serviceOpt !== "Pickup") {
            values.address = address;
            values.coord = coord;
          }
          values.cost = getTotal(values, "cost");
          values.tax = getTotal(values, "tax");
          values.totalPrice = getTotal(values, "");
          values.notifyEmail = notifyEmail;
          values.SelID = SelID;
          values.tname = tname;
          let temp = Object.assign({}, values, user);

          if (values.paymentMode === "card") {
            const result = await payOrder({
              tname: tname,
              price: values.totalPrice * 100,
              sellerAccount: sellerAccount,
            });
            temp.checkoutSession = result;
            temp.isOnlineOrder = true;
            temp.serviceFee = (values.totalPrice * 0.05).toFixed(2);
            temp.payout = (values.totalPrice - temp.serviceFee).toFixed(2);
            const { data: stripeData } = temp.checkoutSession;
            temp.ch_id = stripeData.id;
            const res = await saveOnlineOrder(temp);
            temp.cusOrderId = res.insertedId;
            const data = await saveOrder(temp);

            window.location.href = stripeData.url;
            setLoading(false);
          } else {
            temp.isOnlineOrder = true;
            const data = await saveOrder(temp);

            window.location.href = "/orders";
            setLoading(false);
          }
        } else {
          setOpen(true);
        }
      } else {
        setAddErr(true);
      }
    },
  });
  const [address, setAddress] = useState("");
  const [selectedAdd, setSelectedAdd] = useState();
  const [addErr, setAddErr] = useState(false);
  return (
    <>
      <ServiceFeesDialog
        openSFDialog={openSFDialog}
        setOpenSFDialog={setOpenSFDialog}
        serviceFees={serviceFees}
      />
      <form enableReinitialize={true} onSubmit={formik.handleSubmit}>
        <Grid item container direction="row" style={{ padding: "8px" }}>
          <Snackbar
            open={snack}
            autoHideDuration={2000}
            onClose={() => setSnack(false)}
            message="Copied to clipboard"
          />
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
                  formik.setFieldValue("rrOpt", "");
                  formik.setFieldValue("menuOpt", "");
                  formik.setFieldValue("price", "");
                  formik.setFieldValue("sDate", moment().format("YYYY-MM-DD"));
                  formik.setFieldValue(
                    "eDate",
                    moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD")
                      .add(e.target.value?.days, "days")
                      .format("YYYY-MM-DD")
                  );
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
                  formik.setFieldValue("rrOpt", "");
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
                error={formik.touched.rrOpt && Boolean(formik.errors.rrOpt)}
              >
                {rrOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {Object.keys(option).map((key) => {
                      return (
                        (option[key] > 0
                          ? option[key] === 1
                            ? ""
                            : option[key]
                          : " no") +
                        " " +
                        _.capitalize(key) +
                        " \\"
                      );
                    })}
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
                      if (e.target.value >= 0 && e.target.value <= 10) {
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
          {formik.values.selPlan?.days !== undefined && (
            <Grid item xs={12} container alignItems="center">
              {/* <Typography style={{ marginRight: 10 }}>Start Date</Typography> */}
              <TextField
                style={{ marginBlock: 10 }}
                id="sDate"
                fullWidth
                name="sDate"
                type="date"
                label="Start Date"
                variant="outlined"
                placeholder="YYYY-MM-DD"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values?.sDate}
                onChange={(e) => {
                  const inputDate = e.target.value;

                  // Remove non-numeric characters
                  // const numericDate = inputDate.replace(/\D/g, "");

                  // Format the date as the user types (YYYY-MM-DD)
                  // if (numericDate.length <= 8) {
                  //   const formattedDate =
                  //     numericDate.slice(0, 4) +
                  //     (numericDate[4] ? "-" + numericDate.slice(4, 6) : "") +
                  //     (numericDate[6] ? "-" + numericDate.slice(6, 8) : "");
                  if (
                    !moment(inputDate, "YYYY-MM-DD").isValid() ||
                    !moment(inputDate).isSameOrAfter(
                      moment().format("YYYY-MM-DD")
                    )
                  ) {
                    window.alert(
                      "Please enter the correct date (today or any future date)"
                    );
                    formik.setFieldValue("sDate", "");
                    formik.setFieldValue("eDate", "");
                  } else {
                    formik.setFieldValue("sDate", inputDate);
                    formik.setFieldValue(
                      "eDate",
                      moment(inputDate, "YYYY-MM-DD")
                        .add(formik.values.selPlan?.days, "days")
                        .format("YYYY-MM-DD")
                    );
                  }
                  // }
                }}
                // onBlur={(e) => {
                //   if (
                //     formik.values.sDate?.length !== 10 ||
                //     !moment(formik.values.sDate, "YYYY-MM-DD").isValid() ||
                //     !moment(formik.values.sDate).isSameOrAfter(
                //       moment().format("YYYY-MM-DD")
                //     )
                //   ) {
                //     window.alert(
                //       "Please enter the correct date (today or any future date)"
                //     );
                //     formik.setFieldValue("sDate", "");
                //     formik.setFieldValue("eDate", "");
                //   }
                // }}
                error={formik.touched.sDate && Boolean(formik.errors.sDate)}
                // helperText={formik.touched.sDate && formik.errors.sDate}
              />
            </Grid>
          )}
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
              <InputLabel id={"serviceOpt"}>Select Service</InputLabel>
              <Select
                labelId={"serviceOpt"}
                id={"serviceOpt"}
                name={"serviceOpt"}
                value={formik.values.serviceOpt}
                label={"Service Type"}
                onChange={(e) => {
                  formik.setFieldValue("serviceOpt", e.target.value);
                }}
                error={
                  formik.touched.serviceOpt && Boolean(formik.errors.serviceOpt)
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
          <input type="hidden" id="addr" />
          {formik.values.serviceOpt !== "Pickup" && (
            <LocationSearchInput
              delArea={delArea}
              setAddress={setAddress}
              address={address}
              selectedAdd={selectedAdd}
              setSelectedAdd={setSelectedAdd}
              error={addErr}
              delAreaNote={delAreaNote}
              setCoord={setCoord}
              tname={tname}
            />
          )}
          {paymentOptions.length > 0 && (
            <FormControl fullWidth style={{ marginTop: 30, marginBottom: 10 }}>
              <InputLabel id={"paymentMode"}>Pay using</InputLabel>
              <Select
                id="paymentMode"
                name="paymentMode"
                values={formik.values.paymentMode}
                defaultValue={defaultPayment}
                label="Pay using"
                onChange={(e) => {
                  if (e.target.value === "interac") {
                    formik.setFieldValue("confNum", "");
                  } else {
                    formik.setFieldValue("confNum", "N/A");
                  }
                  formik.setFieldValue("paymentMode", e.target.value);
                }}
                error={
                  formik.touched.paymentMode &&
                  Boolean(formik.errors.paymentMode)
                }
              >
                {paymentOptions.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Grid item xs={12}>
            <Typography
              variant={"h6"}
              style={{ marginTop: 20, fontWeight: "bold", fontSize: 25 }}
            >
              Summary
            </Typography>
          </Grid>
          <Grid item xs={12} container>
            <Grid
              item
              xs={6}
              container
              direction="column"
              style={{ marginTop: 40 }}
            >
              {formik.values.selPlan?.planName && (
                <Typography>{formik.values.prodType?.prodName}</Typography>
              )}
              {formik.values.selPlan?.planName && (
                <Typography>{formik.values.selPlan?.planName}</Typography>
              )}
              {formik.values?.menuOpt && (
                <Typography>{formik.values.menuOpt?.menuType}</Typography>
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
              {formik.values?.eDate && (
                <Typography>
                  Ends on - <strong>{formik.values?.eDate}</strong>
                </Typography>
              )}
              {/* {!!formik.values.selPlan?.days && (
                <Grid style={{ backgroundColor: "whitesmoke" }}>
                  <Typography>
                    Ends on
                    <Typography style={{ fontWeight: "bolder", fontSize: 20 }}>
                      {moment(formik.values?.sDate, "YYYY-MM-DD")
                        .add(formik.values.selPlan?.days, "days")
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
                alignItems="center"
                style={{ marginTop: 40 }}
              >
                <Typography>
                  Cost{" "}
                  {serviceFees && formik.values.paymentMode === "card" && (
                    <InfoIcon
                      onClick={() => setOpenSFDialog(true)}
                      fontSize="small"
                      style={{
                        padding: 0,
                        margin: 0,
                        paddingBottom: 3,
                        cursor: "pointer",
                      }}
                    />
                  )}
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

          {formik.values.paymentMode === "interac" && (
            <>
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
                  <span style={{ fontWeight: "bolder" }}>
                    {interacEmail}
                  </span>{" "}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigator.clipboard.writeText(interacEmail);
                      setSnack(true);
                    }}
                  >
                    <ContentCopyIcon />
                  </span>{" "}
                  and enter the confirmation number below
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
            </>
          )}
          {!!!sellerAccount || !isVerified ? (
            <Typography color="secondary">
              Seller currently doesn't accept any orders
            </Typography>
          ) : (
            <Button
              variant="contained"
              type="submit"
              disabled={sellerAccount === undefined}
              fullWidth
              onClick={() => {
                if (formik.values.prodType === "") {
                  document.getElementById("prodType").scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                  });
                }
                if (formik.values.selPlan === "") {
                  document.getElementById("selPlan")?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                  });
                }
                if (formik.values.menuOpt === "") {
                  document.getElementById("menuOpt")?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                  });
                }
                if (formik.values.rrOpt === "") {
                  document.getElementById("rrOpt")?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                  });
                }
                if (formik.values.sDate === "") {
                  document.getElementById("sDate")?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                  });
                }
                if (
                  formik.values.serviceOpt === "Delivery" &&
                  (!address || address !== selectedAdd)
                ) {
                  document.getElementById("serviceOpt")?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                  });
                }
              }}
              style={{
                marginTop: 20,
                backgroundColor: "black",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              Pay
            </Button>
          )}
        </Grid>
      </form>
    </>
  );
};

export default OrderForm;
