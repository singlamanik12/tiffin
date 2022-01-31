import React from "react";
import Typography from "@mui/material/Typography";
const Label = ({ variant, label, style }) => {
  return (
    <Typography
      style={style}
      gutterBottom
      style={{ padding: 3, marginTop: 40 }}
    >
      {label}
    </Typography>
  );
};

export default Label;
