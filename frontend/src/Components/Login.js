import Axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router";

// MUI
import { Button, Grid, TextField, Typography } from "@mui/material";

// Contexts
import DispatchContext from "../Contexts/DispatchContext";
import StateContext from "../Contexts/StateContext";

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

function Login() {
  const GlobalDispatch = useContext(DispatchContext);
  const GlobalState = useContext(StateContext);
  const navigate = useNavigate();

  const initialState = {
    usernameValue: "",
    passwordValue: "",
    sendRequest: 0,
    token: null,
  };

  function ReducerFunction(state, action) {
    switch (action.type) {
      case "SET_USERNAME":
        return { ...state, usernameValue: action.payload };
      case "SET_PASSWORD":
        return { ...state, passwordValue: action.payload };
      case "SET_SEND_REQUEST":
        return { ...state, sendRequest: action.payload };
      case "CATCH_TOKEN":
        return { ...state, token: action.payload };
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
      async function SignIn() {
        try {
          const response = await Axios.post(
            "http://localhost:8000/api-auth-djoser/token/login/",
            {
              username: state.usernameValue,
              password: state.passwordValue,
            },
            {
              cancelToken: source.token,
            }
          );
          console.log(response);
          dispatch({ type: "CATCH_TOKEN", payload: response.data.auth_token });
          GlobalDispatch({
            type: "CATCH_TOKEN",
            payload: response.data.auth_token,
          });
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }
      SignIn();
      return () => {
        source.cancel();
      };
    }
  }, [state.sendRequest]);

  // Get user info
  useEffect(() => {
    if (state.token) {
      const source = Axios.CancelToken.source();
      async function GetUserInfo() {
        try {
          const response = await Axios.get(
            "http://localhost:8000/api-auth-djoser/users/me/",
            {
              headers: {
                Authorization: `Token ${state.token}`,
              },
            },
            {
              cancelToken: source.token,
            }
          );
          console.log(response);
          GlobalDispatch({
            type: "USER_SIGNS_IN",
            usernameInfo: response.data.username,
            emailInfo: response.data.email,
            idInfo: response.data.id,
          });
          navigate("/");
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }
      GetUserInfo();
      return () => {
        source.cancel();
      };
    }
  }, [state.token]);

  return (
    <div style={formContainer}>
      <form onSubmit={FormSubmit}>
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
            value={state.usernameValue}
            onChange={(e) =>
              dispatch({ type: "SET_USERNAME", payload: e.target.value })
            }
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
            onChange={(e) =>
              dispatch({ type: "SET_PASSWORD", payload: e.target.value })
            }
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
          <span
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer", color: "green" }}
          >
            SIGN UP
          </span>
        </Typography>
      </Grid>
    </div>
  );
}

export default Login;
