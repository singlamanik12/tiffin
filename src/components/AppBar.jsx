import React, { useContext, useEffect } from "react";
import { AppBar, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import SideBar from "./SideBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DataContext from "./../api/context";

const EnableColorOnDarkAppBar = () => {
  const { setOpen, user, setSide } = useContext(DataContext);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });
  console.log(user);
  return (
    <Stack spacing={2} sx={{ flexGrow: 1, marginBottom: 2 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <SideBar />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Daily Cater
            </Typography>
            {/* <Button color="inherit" onClick={() => setOpen(true)}>
      Login/SignUp
    </Button> */}
            {!!user ? (
              <Typography>{user.FirstName}</Typography>
            ) : (
              <Button color="inherit" onClick={() => setOpen(true)}>
                Sign In
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
};

export default EnableColorOnDarkAppBar;
