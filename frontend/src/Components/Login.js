import { useNavigate } from "react-router";

// MUI
import { Button, Grid, TextField, Typography } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const formContainer = {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "3rem",
    border: "5px solid black",
    padding: "3rem",
  };

  const loginBtn = {
    width: "66%",
    backgroundColor: "green",
    color: "white",
    fontSize: "1.1rem",
    marginRight: "1rem",
    "&:hover": {
      backgroundColor: "blue",
    },
  };

  return (
    <div style={formContainer}>
      <form>
        <Grid container justifyContent="center">
          <Typography variant="h4" gutterBottom>
            SIGN IN
          </Typography>
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
          />
        </Grid>
        <Grid container justifyContent="center" sx={{ marginTop: "1rem" }}>
          <Button variant="contained" type="submit" sx={loginBtn}>
            SIGN IN
          </Button>
        </Grid>
      </form>
      <Grid container justifyContent="center" sx={{ marginTop: "1rem" }}>
        <Typography variant="small" gutterBottom>
          Don't have an account yet?{" "}
          <span onClick={() => navigate("/register")} style={{ cursor: "pointer", color: "green" }}>SIGN UP</span>
        </Typography>
      </Grid>
    </div>
  );
}

export default Login;
