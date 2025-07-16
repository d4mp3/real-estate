import { useContext } from "react";
import { useNavigate } from "react-router";

// MUI imports
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

// Contexts
import StateContext from "../Contexts/StateContext";

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

const rightBoxStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
  marginRight: "10rem",
};

function Header() {
    const navigate  = useNavigate();
    const GlobalState = useContext(StateContext);
  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ flex: 1 }}>
          <Button color="inherit" onClick={() => navigate("/")}>
            <Typography variant="h4">LBREP</Typography>
          </Button>
        </Box>
        <Box>
          <Button color="inherit" sx={{ marginRight: "2rem" }} onClick={() => navigate("/listings")}>
            <Typography variant="h6">Listings</Typography>
          </Button>
          <Button color="inherit" sx={{ marginLeft: "2rem" }} onClick={() => navigate("/agencies")}>
            <Typography variant="h6">Agencies</Typography>
          </Button>
        </Box>
        <Box sx={rightBoxStyle}>
          <Button sx={addPropertyButtonStyle}
          // onClick={() => navigate("/add-property")}
          >
            <Typography variant="button">Add Property</Typography>
          </Button>
          {GlobalState.userIsLogged ? (
            <Button sx={loginButtonStyle} onClick={() => navigate("/login")}>
              <Typography variant="button">{GlobalState.userUsername}</Typography>
            </Button>
          ) : (
            <Button sx={loginButtonStyle} onClick={() => navigate("/login")}>
              <Typography variant="button">Login</Typography>
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
