import React, { useEffect, useState } from "react";
import InputField from "../shared/InputField";
import Label from "../shared/Label";
import Layout from "./../shared/Layout";
import { Button, InputAdornment, Typography } from "@mui/material";
const ServiceEditor = () => {
  const [value, setValue] = useState({});
  const [edited, setEdited] = useState(false);
  useEffect(() => {
    const initialValues = JSON.parse(localStorage.getItem("value"));
    console.log(initialValues);
    setValue(initialValues);
  }, []);
  const handleChange = (event) => {
    setEdited(true);
    console.log(event.target.id);
    setValue(
      Object.assign({}, value, { [event.target.id]: event.target.value })
    );
  };
  const handleSubmit = () => {
    localStorage.setItem("value", JSON.stringify(value));
  };
  return (
    <Layout>
      <Typography style={{ fontWeight: "bold", fontSize: 30 }}>
        Your delicious menu
      </Typography>
      <Label
        variant="button"
        label="Overview"
        style={{ paddingLeft: "11px", fontSize: 15 }}
      />
      <InputField
        rows={3}
        multiline={true}
        id="overview"
        value={value?.overview}
        placeholder="Tell briefly about your service in 3-4 lines."
        onChange={handleChange}
      />

      <InputField
        id="phoneNo"
        value={value?.phoneNo}
        placeholder="Add your phone number"
        onChange={handleChange}
        style={{ marginTop: 10 }}
        startAdornment={<InputAdornment position="start">+1</InputAdornment>}
      />
      <Label
        variant="button"
        label="Vegetarian Menu"
        style={{ paddingLeft: "11px", marginTop: "30px", fontSize: 15 }}
      />

      <InputField
        rows={3}
        multiline={true}
        id="veg"
        value={value?.veg}
        placeholder="Example - 'Aloo gobhi/Shahi paneer/.....' "
        onChange={handleChange}
        helperText="Please make sure to include '/' after every item."
      />
      {/* <ImportantLabel label="Please make sure to include '/' after every item." /> */}
      <InputField
        id="vegPrice"
        value={value?.vegPrice}
        placeholder=""
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">Price - C$</InputAdornment>
        }
      />

      <Label
        variant="button"
        label="Non-Vegetarian Menu"
        style={{ paddingLeft: "11px", marginTop: "30px", fontSize: 15 }}
      />

      <InputField
        rows={3}
        multiline={true}
        id="nveg"
        value={value?.nveg}
        placeholder="Example - 'Butter Chicken/Chicken Korma/.....' "
        onChange={handleChange}
        helperText="Please make sure to include '/' after every item."
      />
      <InputField
        id="nvegPrice"
        value={value?.nvegPrice}
        placeholder=""
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">Price - C$</InputAdornment>
        }
      />

      {/* <ImportantLabel label="Please make sure to include '/' after every item." /> */}

      <Label
        variant="button"
        label="Rice/Roti Options"
        style={{ paddingLeft: "11px", marginTop: "30px", fontSize: 15 }}
      />

      <InputField
        rows={3}
        multiline={true}
        id="rrOpt"
        value={value?.rrOpt}
        placeholder="Example - 'Six roti/Four roti + Rice/.....' "
        onChange={handleChange}
        helperText="Please make sure to include '/' after every item."
      />
      <Label
        variant="button"
        label="Raita/Salad Options"
        style={{ paddingLeft: "11px", marginTop: "30px", fontSize: 15 }}
      />
      <InputField
        rows={3}
        multiline={true}
        id="rsOpt"
        value={value?.rsOpt}
        placeholder="Example - 'Raita/Salad/.....' "
        onChange={handleChange}
        helperText="Please make sure to include '/' after every item."
      />
      {/* <ImportantLabel label="Please make sure to include '/' after every item." /> */}
      <Button
        variant="contained"
        style={{ marginTop: "30px" }}
        disabled={!edited}
        onClick={handleSubmit}
      >
        Save Changes
      </Button>
    </Layout>
  );
};

export default ServiceEditor;
