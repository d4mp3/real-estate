import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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

  const navigate = useNavigate();
  const [sendRequest, setSendRequest] = useState(false);
  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [rePasswordValue, setRePasswordValue] = useState("");

  function FormSubmit(e) {
    e.preventDefault();
    console.log("Form submitted");
    setSendRequest(!sendRequest);
  }

  useEffect(() => {
    if (sendRequest) {
      const source = Axios.CancelToken.source();
      async function SignUp() {
        try {
          const response = await Axios.post(
            "http://localhost:8000/api-auth-djoser/users/",
            {
              username: usernameValue,
              email: emailValue,
              password: passwordValue,
              re_password: rePasswordValue,
            },
            {
              cancelToken: source.token
          });
          console.log(response)
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }
      SignUp();
      return () => {
        source.cancel();
      }
    }
  }, [sendRequest]);

  return (
    <div style={formContainer}>
      <form onSubmit={FormSubmit}>
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
            value={usernameValue}
            onChange={(e) => setUsernameValue(e.target.value)}
          />
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            />
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <TextField
            id="re-password"
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            value={rePasswordValue}
            onChange={(e) => setRePasswordValue(e.target.value)}
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
          <span onClick={() => navigate("/login")} style={{ cursor: "pointer", color: "green" }}>SIGN IN</span>
        </Typography>
      </Grid>
    </div>
  );
}

export default Register;
