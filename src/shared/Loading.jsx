import React, { useContext } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { Dialog } from "@mui/material";
import DataContext from "../api/context";

export default function Loading() {
  const { loading } = useContext(DataContext);
  return (
    loading && (
      <Dialog fullScreen open={loading} style={{ opacity: 0.5 }}>
        <CircularProgress
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            color: "black",
          }}
        />
      </Dialog>
    )
  );
}
