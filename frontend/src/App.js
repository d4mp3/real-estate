// MUI imports
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router";

// Components
import Header from "./Components/Header";
import Home from "./Components/Home";
import Listings from "./Components/Listings";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/listings" element={<Listings />} />
        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>
  );
}

export default App;
