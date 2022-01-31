import React, { useState } from "react";
import DataContext from "./api/context";
import LoginForm from "./components/LoginForm";
import ServiceRoutes from "./components/Routes";
import Footer from "./components/Footer";
import { Grid } from "@mui/material";
import AppBar from "./components/AppBar";

const App = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  return (
    <DataContext.Provider value={{ open, setOpen, user, setUser }}>
      {/* <Grid item xs={12}>
        <Typography>Harnish</Typography>
      </Grid> */}
      <LoginForm />
      <AppBar />
      <Grid container style={{ minHeight: "80vh", padding: "8px" }}>
        <ServiceRoutes />
      </Grid>
      <Footer />
    </DataContext.Provider>
  );
};

export default App;
