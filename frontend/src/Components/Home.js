import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import city from "./Assets/city.jpg";

const addPropertyButtonStyle = {
    backgroundColor: "green",
    color: "white",
    width: "15rem",
    fontSize: "1.1rem",
    marginRight: "1rem",
    "&:hover": {
        backgroundColor: "grey"
    }
};

const loginButtonStyle = {
    backgroundColor: "white",
    color: "black",
    width: "15rem",
    fontSize: "1.1rem",
    marginRight: "1rem",
    "&:hover": {
        backgroundColor: "lightgrey"
    }
};

const rightBoxStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "10rem"
};

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
}

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
            <AppBar position="static" sx={{ backgroundColor: "black" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ flex: 1 }}>
                        <Button color="inherit">
                            <Typography variant="h4">LBREP</Typography>
                        </Button>
                    </Box>
                    <Box>
                        <Button color="inherit" sx={{ marginRight: "2rem" }}><Typography variant="h6">Listings</Typography></Button>
                        <Button color="inherit" sx={{ marginLeft: "2rem" }}><Typography variant="h6">Agencies</Typography></Button>
                    </Box>
                    <Box sx={rightBoxStyle}>
                        <Button sx={addPropertyButtonStyle}>
                            <Typography variant="button">Add Property</Typography>
                        </Button>
                        <Button sx={loginButtonStyle}>
                            <Typography variant="button">Login</Typography>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <div style={{ position: "relative" }}>
                <Box component="img" src={city} alt="City" sx={cityImg} />
                <Box component="div" sx={overlayText}>
                    <Typography variant="h1" sx={homeText}>FIND YOUR <span style={{ color: "green" }}>NEXT PROPERTY</span> ON THE LBREP WEBSITE</Typography>
                    <Button variant="contained" sx={homeBtn}>
                        SEE ALL PROPERTIES
                    </Button>
                </Box>
            </div>

        </>
    );
}

export default Home;
