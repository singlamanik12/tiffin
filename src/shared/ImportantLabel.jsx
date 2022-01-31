import React from "react";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Typography, Grid } from "@mui/material";

const ImportantLabel = ({ label }) => {
  return (
    <Grid item container direction="row" style={{ marginTop: "5px" }}>
      <PriorityHighIcon color="warning" fontSize="small" />
      <Typography variant="caption" style={{ marginTop: "2px" }}>
        {label}
      </Typography>
    </Grid>
  );
};

export default ImportantLabel;
