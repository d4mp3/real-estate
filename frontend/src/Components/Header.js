import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


// MUI
import { Button, Typography, AppBar, Toolbar } from '@mui/material';

function Header() {
    const navigate = useNavigate();
    return (
        <AppBar position="static" style={{ backgroundColor: "black" }}>
            <Toolbar>
                <div style={{ marginRight: "auto" }}>
                    <Button color="inherit" onClick={() => navigate('/')}>
                        <Typography variant="h4">REAL ESTATE</Typography>
                    </Button>
                </div>
                <div>
                    <Button color="inherit">
                        <Typography variant="h6" onClick={() => navigate('/listings')}>Listings</Typography>
                    </Button>
                    <Button color="inherit">
                        <Typography variant="h6">Agencies</Typography>
                    </Button>
                </div>
                <div style={{ marginLeft: "auto", marginRight: "10rem" }}>
                    <Button style={{
                        backgroundColor: "black",
                        color: "white",
                        width: "15rem",
                        fontSize: "1.1rem",
                        marginRight: "1rem",
                        "&:hover": {
                            backgroundColor: "blue"
                        }
                    }}>Add Property</Button>
                    <Button style={{
                        backgroundColor: "white",
                        color: "black",
                        width: "15rem",
                        fontSize: "1.1rem",
                        marginRight: "1rem",
                        "&:hover": {
                            backgroundColor: "blue"
                        }
                    }} onClick={() => navigate('/login')}>LOGIN</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header
