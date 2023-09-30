import React, { useState } from 'react';

// MUI
import { Button, Typography } from '@mui/material';

// ASSETS
import city from '../Assets/city.jpg';

function Home() {
  return (
    <>
      <div style={{ position: "relative" }}>
				<img src={city} style={{ width: "100%", height: "92vh" }} />
				<div
					style={{
						position: "absolute",
						zIndex: "100",
						top: "100px",
						left: "20px",
						textAlign: "center",
					}}
				>
					<Typography
						variant="h1"
						style={{ color: "white", fontWeight: "bolder", textShadow: '1px 2px 9px #F4AAB9'}}
					>
						FIND YOUR <span style={{ color: "brown" }}>PROPERTY</span> ON THE REAL ESTATE
					</Typography>
					<Button
						variant="contained"
						style={{
							fontSize: "3.5rem",
							borderRadius: "15px",
							backgroundColor: "brown",
							marginTop: "2rem",
							boxShadow: "3px 3px 3px white",
						}}
					>
						SEE ALL PROPERTIES
					</Button>
				</div>
			</div>
    </>
  );

}

export default Home
