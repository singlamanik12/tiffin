import React, { useState, useEffect } from "react";
import DataContext from "./api/context";
import LoginForm from "./components/LoginForm";
import ServiceRoutes from "./components/Routes";
import Footer from "./components/Footer";
import { Grid } from "@mui/material";
import AppBar from "./components/AppBar";
import Loading from "./shared/Loading";

const App = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [side, setSide] = React.useState({
    left: false,
  });
  useEffect(() => {
    const data = localStorage.getItem("user");
    setUser(JSON.parse(data));
  }, []);
  return (
    <DataContext.Provider
      value={{
        open,
        setOpen,
        user,
        setUser,
        side,
        setSide,
        loading,
        setLoading,
      }}
    >
      {/* <Grid item xs={12}>
        <Typography>Harnish</Typography>
      </Grid> */}
      <AppBar />
      <LoginForm />
      <Grid container style={{ minHeight: "80vh", padding: "8px" }}>
        <Loading />
        <ServiceRoutes />
      </Grid>
      <Footer />
    </DataContext.Provider>
  );
};

export default App;
