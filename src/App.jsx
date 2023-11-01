import React, { useState, useEffect } from "react";
import { Alert, createTheme, ThemeProvider } from "@mui/material";
import DataContext from "./api/context";
import LoginForm from "./components/LoginForm";
import ServiceRoutes from "./components/Routes";
import Footer from "./components/Footer";
import { Grid } from "@mui/material";
import AppBar from "./components/AppBar";
import Loading from "./shared/Loading";
import Merriweather from "./resources/Merriweather-Regular.ttf";
import { getWebsiteConfig } from "./api/menu";

const App = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [side, setSide] = React.useState({
    left: false,
  });
  const [webConfig, setWebConfig] = useState();
  const configWebsite = async () => {
    const { data } = await getWebsiteConfig({
      domainName: window.location.hostname,
    });
    setWebConfig(data);
  };
  const theme = createTheme({
    typography: {
      fontFamily: "Merriweather, sans-serif",
      fontSize: 17,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Merriweather';
            font-style: normal;
            font-display: swap;
            font-weight: 700;
            src: local('Merriweather'), local('Merriweather-Medium'), url(${Merriweather}) format('ttf');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
  });

  useEffect(() => {
    const data = localStorage.getItem("user");
    configWebsite();
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
      <AppBar />
      <LoginForm />

      <Grid container style={{ minHeight: "80vh" }}>
        <Loading />
        <ServiceRoutes />
      </Grid>
      <Footer />
    </DataContext.Provider>
  );
};

export default App;
