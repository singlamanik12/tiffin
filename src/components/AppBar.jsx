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
    <Stack spacing={2} sx={{ flexGrow: 1, zIndex: -1 }}>
      <AppBar
        position="static"
        elevation={0}
        style={{ backgroundColor: "white" }}
      >
        <Toolbar style={{ padding: 0 }}>
          <SideBar />
          <Typography
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ cursor: "pointer", color: "black", fontSize: "20px" }}
            onClick={() => navigate(`/`)}
          >
            DT <span style={{ fontWeight: "bolder" }}>Meals</span>
          </Typography>
          {/* <Button color="inherit" onClick={() => setOpen(true)}>
      Login/SignUp
    </Button> */}
          {!!user ? (
            <Typography
              variant="caption"
              color="black"
              style={{ marginRight: 5 }}
            >
              {user.FirstName} {user.LastName}
            </Typography>
          ) : (
            <div
              style={{
                color: "black",
                backgroundColor: "gray",
                padding: 5,
                borderRadius: 10,
              }}
              onClick={() => setOpen(true)}
            >
              Sign In
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Stack>
  );
};

export default EnableColorOnDarkAppBar;
