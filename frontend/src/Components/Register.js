import Axios from "axios";
import { useEffect, useState, useReducer } from "react";
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

  const initialState = {
    usernameValue: "",
    emailValue: "",
    passwordValue: "",
    rePasswordValue: "",
    sendRequest: 0,
  };

  function ReducerFunction(state, action) {
    switch (action.type) {
      case "SET_USERNAME":
        return { ...state, usernameValue: action.payload };
      case "SET_EMAIL":
        return { ...state, emailValue: action.payload };
      case "SET_PASSWORD":
        return { ...state, passwordValue: action.payload };
      case "SET_RE_PASSWORD":
        return { ...state, rePasswordValue: action.payload };
      case "SET_SEND_REQUEST":
        return { ...state, sendRequest: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(ReducerFunction, initialState);

  function FormSubmit(e) {
    e.preventDefault();
    console.log("Form submitted");
    dispatch({ type: "SET_SEND_REQUEST", payload: true });
  }

  useEffect(() => {
    if (state.sendRequest) {
      const source = Axios.CancelToken.source();
      async function SignUp() {
        try {
          const response = await Axios.post(
            "http://localhost:8000/api-auth-djoser/users/",
            {
              username: state.usernameValue,
              email: state.emailValue,
              password: state.passwordValue,
              re_password: state.rePasswordValue,
            },
            {
              cancelToken: source.token
          });
          console.log(response)
          navigate("/")
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }
      SignUp();
      return () => {
        source.cancel();
      }
    }
  }, [state.sendRequest]);

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
            value={state.usernameValue}
            onChange={(e) => dispatch({ type: "SET_USERNAME", payload: e.target.value })}
          />
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={state.emailValue}
            onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
          />
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={state.passwordValue}
            onChange={(e) => dispatch({ type: "SET_PASSWORD", payload: e.target.value })}
          />
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <TextField
            id="re-password"
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            value={state.rePasswordValue}
            onChange={(e) => dispatch({ type: "SET_RE_PASSWORD", payload: e.target.value })}
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
