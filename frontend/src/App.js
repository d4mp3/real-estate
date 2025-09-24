import { useEffect, useReducer } from "react";

// MUI imports
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router";

// Components
import AddProperty from "./Components/AddProperty";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Listings from "./Components/Listings";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import Testing from "./Components/Testing";

// Contexts
import DispatchContext from "./Contexts/DispatchContext";
import StateContext from "./Contexts/StateContext";

function App() {
  const initialState = {
    userUsername: localStorage.getItem("userUsername"),
    userEmail: localStorage.getItem("userEmail"),
    userId: localStorage.getItem("userId"),
    userToken: localStorage.getItem("userToken"),
    userIsLogged: localStorage.getItem("userUsername") ? true : false,
  };

  function ReducerFunction(state, action) {
    switch (action.type) {
      case "CATCH_TOKEN":
        return { ...state, userToken: action.payload };
      case "USER_SIGNS_IN":
        return {
          ...state,
          userUsername: action.usernameInfo,
          userEmail: action.emailInfo,
          userId: action.idInfo,
          userIsLogged: true,
        };
      case "USER_LOGS_OUT":
        return {
          ...state,
          userUsername: null,
          userEmail: null,
          userId: null,
          userToken: null,
          userIsLogged: false,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(ReducerFunction, initialState);

  useEffect(() => {
    if (state.userIsLogged) {
      localStorage.setItem("userUsername", state.userUsername);
      localStorage.setItem("userEmail", state.userEmail);
      localStorage.setItem("userId", state.userId);
      localStorage.setItem("userToken", state.userToken);
      console.log("User is logged in:", state.userUsername);
    }
    else {
      localStorage.removeItem("userUsername");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");
      localStorage.removeItem("userToken");
      console.log("User is logged out.");
    }
  }, [state.userIsLogged]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <StyledEngineProvider injectFirst>
          <BrowserRouter>
            <CssBaseline />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/add-property" element={<AddProperty />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/testing" element={<Testing />} />
            </Routes>
          </BrowserRouter>
        </StyledEngineProvider>
      </DispatchContext.Provider>
     </StateContext.Provider>
  );
}

export default App;
