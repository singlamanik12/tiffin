import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import DataContext from "../api/context";
import { signup } from "../api/customer";
const InfoSchema = Yup.object().shape({
  FirstName: Yup.string().required("Required"),
  LastName: Yup.string().required("Required"),
});
const InfoForm = ({ PhoneNumber, setOpen, handlePhoneVerification }) => {
  const { setLoading } = useContext(DataContext);
  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      PhoneNumber: PhoneNumber,
    },
    validationSchema: InfoSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await signup(values);
      setLoading(false);
      handlePhoneVerification(PhoneNumber);
    },
  });
  return (
    <>
      {/* <DialogTitle>LogIn</DialogTitle> */}
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="FirstName"
            name="FirstName"
            label="First Name"
            type="name"
            fullWidth
            value={formik.values.FirstName}
            onChange={formik.handleChange}
            error={formik.touched.FirstName && Boolean(formik.errors.FirstName)}
          />
          <TextField
            margin="dense"
            id="LastName"
            name="LastName"
            label="Last Name"
            type="name"
            fullWidth
            value={formik.values.LastName}
            onChange={formik.handleChange}
            error={formik.touched.LastName && Boolean(formik.errors.LastName)}
          />
          {/* <TextField
          margin="dense"
          id="phoneNumber"
          label="Phone Number"
          type="tel"
          inputProps={{ maxlength: 10 }}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+1</InputAdornment>
            ),
          }}
        /> */}
          <Button
            id="sign-in-button"
            variant="contained"
            type="submit"
            fullWidth
            style={{ backgroundColor: "black" }}
          >
            Finish Signup
          </Button>
        </DialogContent>
      </form>
      {/* <DialogActions>
        
      </DialogActions> */}
    </>
  );
};

export default InfoForm;
