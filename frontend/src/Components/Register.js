// MUI
import { Button, Grid, TextField, Typography } from "@mui/material";

function Register() {
  const formContainer = {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "3rem",
    border: "5px solid black",
    padding: "3rem",
  };

  const registerBtn = {
    width: "66%",
    backgroundColor: "green",
    color: "white",
    fontSize: "1.1rem",
    marginRight: "1rem",
    "&:hover": {
      backgroundColor: "blue",
    },
  };

  // Shared styles for price display
  const priceTagStyle = {
    position: "absolute",
    backgroundColor: "green",
    zIndex: "1000",
    color: "white",
    top: "10px",
    left: "20px",
    padding: "5px",
    borderRadius: "4px",
  };

  return (
    <div style={formContainer}>
      <form>
        <Grid container justifyContent="center">
          <Typography variant="h4" gutterBottom>
            CREATE AN ACCOUNT
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
          <TextField id="email" label="Email" variant="outlined" fullWidth />
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
        <Grid container sx={{ marginTop: "1rem" }}>
          <TextField
            id="confirm-password"
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
          />
        </Grid>
        <Grid container justifyContent="center" sx={{ marginTop: "1rem" }}>
          <Button variant="contained" type="submit" sx={registerBtn}>
            SIGN UP
          </Button>
        </Grid>
      </form>
      <Grid container justifyContent="center" sx={{ marginTop: "1rem" }}>
        <Typography variant="small" gutterBottom>
          Already have an account?{" "}
          <span style={{ cursor: "pointer", color: "green" }}>SIGN IN</span>
        </Typography>
      </Grid>
    </div>
  );
}

export default Register;
