import React, { useContext } from "react";
import { AppBar, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

import DataContext from "./../api/context";

const EnableColorOnDarkAppBar = () => {
  const { setOpen, user } = useContext(DataContext);
  let navigate = useNavigate();
  return (
    <Stack spacing={2} sx={{ flexGrow: 1, marginBottom: 2, zIndex: -1 }}>
      <AppBar
        position="static"
        elevation={0}
        style={{ backgroundColor: "white" }}
      >
        <Toolbar>
          <SideBar />
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ cursor: "pointer", color: "black" }}
            onClick={() => navigate(`/`)}
          >
            DT Meals
          </Typography>
          {/* <Button color="inherit" onClick={() => setOpen(true)}>
      Login/SignUp
    </Button> */}
          {!!user ? (
            <Typography color="black">
              {user.FirstName} {user.LastName}
            </Typography>
          ) : (
            <Button style={{ color: "black" }} onClick={() => setOpen(true)}>
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Stack>
  );
};

export default EnableColorOnDarkAppBar;
