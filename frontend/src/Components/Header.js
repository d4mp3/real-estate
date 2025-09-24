import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Axios from "axios";

// MUI imports
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";

// Contexts
import StateContext from "../Contexts/StateContext";
import DispatchContext from "../Contexts/DispatchContext";

const addPropertyButtonStyle = {
  backgroundColor: "green",
  color: "white",
  width: "15rem",
  fontSize: "1.1rem",
  marginRight: "1rem",
  "&:hover": {
    backgroundColor: "grey",
  },
};

const loginButtonStyle = {
  backgroundColor: "white",
  color: "black",
  width: "15rem",
  fontSize: "1.1rem",
  marginRight: "1rem",
  "&:hover": {
    backgroundColor: "lightgrey",
  },
};

const profileButtonStyle = {
  backgroundColor: "green",
  color: "black",
  width: "15rem",
  fontWeight: "bolder",
  borderRadius: "15px",
  marginBottom: "0.2rem",
};

const logoutButtonStyle = {
  backgroundColor: "red",
  color: "black",
  width: "15rem",
  fontWeight: "bolder",
  borderRadius: "15px",
};

const rightBoxStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
  marginRight: "10rem",
};

function Header() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout() {
    setAnchorEl(null);
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;
    try {
      const response = await Axios.post(
        "http://localhost:8000/api-auth-djoser/token/logout/",
        GlobalState.userToken,
        { headers: { Authorization: `Token ${GlobalState.userToken}` } }
      );
      console.log("Logout response:", response);
      GlobalDispatch({ type: "USER_LOGS_OUT" });
      navigate("/");
    } catch (e) {
      console.error("Logout error:", e.response);
    }
  }

  function HandleProfile() {
    setAnchorEl(null);
    navigate("/profile");
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ flex: 1 }}>
          <Button color="inherit" onClick={() => navigate("/")}>
            <Typography variant="h4">LBREP</Typography>
          </Button>
        </Box>
        <Box>
          <Button
            color="inherit"
            sx={{ marginRight: "2rem" }}
            onClick={() => navigate("/listings")}
          >
            <Typography variant="h6">Listings</Typography>
          </Button>
          <Button
            color="inherit"
            sx={{ marginLeft: "2rem" }}
            onClick={() => navigate("/agencies")}
          >
            <Typography variant="h6">Agencies</Typography>
          </Button>
        </Box>
        <Box sx={rightBoxStyle}>
          <Button
            sx={addPropertyButtonStyle}
            onClick={() => navigate("/add-property")}
          >
            <Typography variant="button">Add Property</Typography>
          </Button>
          {GlobalState.userIsLogged ? (
            <Button sx={loginButtonStyle} onClick={handleClick}>
              <Typography variant="button">
                {GlobalState.userUsername}
              </Typography>
            </Button>
          ) : (
            <Button sx={loginButtonStyle} onClick={() => navigate("/login")}>
              <Typography variant="button">Login</Typography>
            </Button>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
          >
            <MenuItem sx={profileButtonStyle} onClick={HandleProfile}>
              Profile
            </MenuItem>
            <MenuItem sx={logoutButtonStyle} onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
