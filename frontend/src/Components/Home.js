import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

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
        </>
    );
}

export default Home;
