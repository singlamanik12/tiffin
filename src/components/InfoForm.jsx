import React, { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField, InputAdornment } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const InfoForm = ({ handleChange, handleSubmit }) => {
  return (
    <>
      {/* <DialogTitle>LogIn</DialogTitle> */}
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="FirstName"
          name="FirstName"
          label="First Name"
          type="name"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="LastName"
          name="LastName"
          label="Last Name"
          type="name"
          fullWidth
          onChange={handleChange}
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
      </DialogContent>
      <DialogActions>
        <Button id="sign-in-button" onClick={handleSubmit}>
          Finish Signup
        </Button>
      </DialogActions>
    </>
  );
};

export default InfoForm;
