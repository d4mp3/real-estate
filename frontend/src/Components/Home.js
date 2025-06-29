
// MUI imports
import { Box, Button, Typography } from "@mui/material";

// Assets
import city from "./Assets/city.jpg";

const cityImg = {
  width: "100%",
  height: "92vh",
};

const overlayText = {
  position: "absolute",
  zIndex: 100,
  top: "100px",
  left: "20px",
  textAlign: "center",
};

const homeText = {
  color: "white",
  fontWeight: "bold",
};

const homeBtn = {
  fontSize: "3.5rem",
  borderRadius: "15px",
  backgroundColor: "green",
  marginTop: "2rem",
  boxShadow: "3px 3px 3px white",
};

function Home() {
  return (
    <>
      <div style={{ position: "relative" }}>
        <Box component="img" src={city} alt="City" sx={cityImg} />
        <Box component="div" sx={overlayText}>
          <Typography variant="h1" sx={homeText}>
            FIND YOUR <span style={{ color: "green" }}>NEXT PROPERTY</span> ON
            THE LBREP WEBSITE
          </Typography>
          <Button variant="contained" sx={homeBtn}>
            SEE ALL PROPERTIES
          </Button>
        </Box>
      </div>
    </>
  );
}

export default Home;
