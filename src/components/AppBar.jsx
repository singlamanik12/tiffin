import React, { useContext, useEffect } from "react";
import { AppBar, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DataContext from "./../api/context";

const EnableColorOnDarkAppBar = () => {
  const { setOpen, user } = useContext(DataContext);
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
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
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
            {Object.keys(user).length != 0 ? (
              <Typography>
                Welcome, {user.FirstName} {user.LastName}
              </Typography>
            ) : (
              <Button color="inherit" onClick={() => setOpen(true)}>
                SignIn
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
};

export default EnableColorOnDarkAppBar;
