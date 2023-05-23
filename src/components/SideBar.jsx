import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DataContext from "../api/context";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
export default function SideBar() {
  const navigate = useNavigate();
  const { user, setUser, side, setSide } = React.useContext(DataContext);
  const onSignOut = () => {
    setUser({});
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSide({ ...side, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List>
        <ListItem button key="Home" onClick={() => navigate("/")}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button key="Orders" onClick={() => navigate("/orders")}>
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button key="SignOut" onClick={() => onSignOut()}>
          <ListItemText primary="SignOut" />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    user && (
      <div>
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <IconButton onClick={toggleDrawer(anchor, true)}>
              {" "}
              <MenuIcon style={{ color: "black" }} fontSize="small" />
            </IconButton>
            <Drawer
              anchor={anchor}
              open={side[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    )
  );
}
