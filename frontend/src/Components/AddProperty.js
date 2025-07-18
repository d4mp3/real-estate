import React from "react";
import Axios from "axios";
import { useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router";

// React Leaflet
import { MapContainer, TileLayer, useMap } from "react-leaflet";

// MUI
import {
  Button,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";

const formContainer = {
  width: "66%",
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

const areaOptions = [
  // {
  //   value: "",
  //   label: "",
  // },
  {
    value: "Inner London",
    label: "Inner London",
  },
  {
    value: "Outer London",
    label: "Outer London",
  },
];

const innerLondonOptions = [
  {
    value: "",
    label: "",
  },
  {
    value: "Camden",
    label: "Camden",
  },
  {
    value: "Greenwich",
    label: "Greenwich",
  },
  {
    value: "Hackney",
    label: "Hackney",
  },
  {
    value: "Hammersmith and Fulham",
    label: "Hammersmith and Fulham",
  },
  {
    value: "Islington",
    label: "Islington",
  },
  {
    value: "Kensington and Chelsea",
    label: "Kensington and Chelsea",
  },
  {
    value: "Lambeth",
    label: "Lambeth",
  },
  {
    value: "Lewisham",
    label: "Lewisham",
  },
  {
    value: "Southwark",
    label: "Southwark",
  },
  {
    value: "Tower Hamlets",
    label: "Tower Hamlets",
  },
  {
    value: "Wandsworth",
    label: "Wandsworth",
  },
  {
    value: "Westminster",
    label: "Westminster",
  },
  {
    value: "City of London",
    label: "City of London",
  },
];

const outerLondonOptions = [
  {
    value: "",
    label: "",
  },
  {
    value: "Barking and Dangenham",
    label: "Barking and Dangenham",
  },
  {
    value: "Barnet",
    label: "Barnet",
  },
  {
    value: "Bexley",
    label: "Bexley",
  },
  {
    value: "Brent",
    label: "Brent",
  },
  {
    value: "Bromley",
    label: "Bromley",
  },
  {
    value: "Croydon",
    label: "Croydon",
  },
  {
    value: "Ealing",
    label: "Ealing",
  },
  {
    value: "Enfield",
    label: "Enfield",
  },
  {
    value: "Haringey",
    label: "Haringey",
  },
  {
    value: "Harrow",
    label: "Harrow",
  },
  {
    value: "Havering",
    label: "Havering",
  },
  {
    value: "Hillingdon",
    label: "Hillingdon",
  },
  {
    value: "Hounslow",
    label: "Hounslow",
  },
  {
    value: "Kingston upon Thames",
    label: "Kingston upon Thames",
  },
  {
    value: "Merton",
    label: "Merton",
  },
  {
    value: "Newham",
    label: "Newham",
  },
  {
    value: "Redbridge",
    label: "Redbridge",
  },
  {
    value: "Richmond upon Thames",
    label: "Richmond upon Thames",
  },
  {
    value: "Sutton",
    label: "Sutton",
  },
  {
    value: "Waltham Forest",
    label: "Waltham Forest",
  },
];

function AddProperty() {
  const navigate = useNavigate();

  const initialState = {
    titleValue: "",
    listingTypeValue: "",
    descriptionValue: "",
    areaValue: "",
    boroughValue: "",
    latitudeValue: "",
    longitudeValue: "",
    propertyStatusValue: "",
    priceValue: "",
    rentalFrequencyValue: "",
    roomsValue: "",
    furnishedValue: false,
    poolValue: false,
    elevatorValue: false,
    cctvValue: false,
    parkingValue: false,
    picture1Value: "",
    picture2Value: "",
    picture3Value: "",
    picture4Value: "",
    picture5Value: "",
    sendRequest: false,
  };

  function ReducerFunction(state, action) {
    switch (action.type) {
      case "SET_TITLE":
        return { ...state, titleValue: action.payload };
      case "SET_LISTING_TYPE":
        return { ...state, listingTypeValue: action.payload };
      case "SET_DESCRIPTION":
        return { ...state, descriptionValue: action.payload };
      case "SET_AREA":
        return { ...state, areaValue: action.payload };
      case "SET_BOROUGH":
        return { ...state, boroughValue: action.payload };
      case "SET_LATITUDE":
        return { ...state, latitudeValue: action.payload };
      case "SET_LONGITUDE":
        return { ...state, longitudeValue: action.payload };
      case "SET_PROPERTY_STATUS":
        return { ...state, propertyStatusValue: action.payload };
      case "SET_PRICE":
        return { ...state, priceValue: action.payload };
      case "SET_RENTAL_FREQUENCY":
        return { ...state, rentalFrequencyValue: action.payload };
      case "SET_ROOMS":
        return { ...state, roomsValue: action.payload };
      case "SET_FURNISHED":
        return { ...state, furnishedValue: action.payload };
      case "SET_POOL":
        return { ...state, poolValue: action.payload };
      case "SET_ELEVATOR":
        return { ...state, elevatorValue: action.payload };
      case "SET_CCTV":
        return { ...state, cctvValue: action.payload };
      case "SET_PARKING":
        return { ...state, parkingValue: action.payload };
      case "SET_PICTURE_1":
        return { ...state, picture1Value: action.payload };
      case "SET_PICTURE_2":
        return { ...state, picture2Value: action.payload };
      case "SET_PICTURE_3":
        return { ...state, picture3Value: action.payload };
      case "SET_PICTURE_4":
        return { ...state, picture4Value: action.payload };
      case "SET_PICTURE_5":
        return { ...state, picture5Value: action.payload };
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

  return (
    <div style={formContainer}>
      <form onSubmit={FormSubmit}>
        <Grid container justifyContent="center">
          <Typography variant="h4" gutterBottom>
            SUBMIT A PROPERTY
          </Typography>
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <TextField
            id="title"
            label="Title"
            variant="standard"
            fullWidth
            value={state.titleValue}
            onChange={(e) =>
              dispatch({ type: "SET_TITLE", payload: e.target.value })
            }
          />
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <TextField
            id="listingType"
            label="Listing Type"
            variant="standard"
            fullWidth
            value={state.listingTypeValue}
            onChange={(e) =>
              dispatch({ type: "SET_LISTING_TYPE", payload: e.target.value })
            }
          />
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <TextField
            id="description"
            label="Description"
            variant="standard"
            fullWidth
            value={state.descriptionValue}
            onChange={(e) =>
              dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
            }
          />
        </Grid>

        <Grid container sx={{ marginTop: "1rem" }}>
          <TextField
            id="propertyStatus"
            label="Property Status"
            variant="standard"
            fullWidth
            value={state.propertyStatusValue}
            onChange={(e) =>
              dispatch({ type: "SET_PROPERTY_STATUS", payload: e.target.value })
            }
          />
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <TextField
            id="price"
            label="Price"
            variant="standard"
            fullWidth
            value={state.priceValue}
            onChange={(e) =>
              dispatch({ type: "SET_PRICE", payload: e.target.value })
            }
          />
        </Grid>
        <Grid container  sx={{
            marginTop: "1rem",
            minWidth: "320px",
            flexGrow: 1,
            maxWidth: "48%",
          }}>
          <TextField
            id="rentalFrequency"
            label="Rental Frequency"
            variant="standard"
            fullWidth
            value={state.rentalFrequencyValue}
            onChange={(e) =>
              dispatch({
                type: "SET_RENTAL_FREQUENCY",
                payload: e.target.value,
              })
            }
          />
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <TextField
            id="rooms"
            label="Rooms"
            variant="standard"
            fullWidth
            value={state.roomsValue}
            onChange={(e) =>
              dispatch({ type: "SET_ROOMS", payload: e.target.value })
            }
          />
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.furnishedValue}
                onChange={(e) =>
                  dispatch({ type: "SET_FURNISHED", payload: e.target.checked })
                }
              />
            }
            label="Furnished"
          />
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.poolValue}
                onChange={(e) =>
                  dispatch({ type: "SET_POOL", payload: e.target.checked })
                }
              />
            }
            label="Pool"
          />
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.elevatorValue}
                onChange={(e) =>
                  dispatch({ type: "SET_ELEVATOR", payload: e.target.checked })
                }
              />
            }
            label="Elevator"
          />
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.cctvValue}
                onChange={(e) =>
                  dispatch({ type: "SET_CCTV", payload: e.target.checked })
                }
              />
            }
            label="CCTV"
          />
        </Grid>
        <Grid container sx={{ marginTop: "1rem" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.parkingValue}
                onChange={(e) =>
                  dispatch({ type: "SET_PARKING", payload: e.target.checked })
                }
              />
            }
            label="Parking"
          />
        </Grid>
       <Grid item container justifyContent={"space-between"} spacing={2}>
          <Grid item xs={5.8} sx={{ marginTop: "1rem" }}>
            <TextField
              id="area"
              label="Area"
              variant="standard"
              fullWidth
              value={state.areaValue}
              onChange={(e) =>
                dispatch({ type: "SET_AREA", payload: e.target.value })
              }
              select
              sx={{
                minWidth: "380px",
                "& .MuiInputBase-root": {
                  minHeight: "48px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1rem",
                },
              }}
            >
              {areaOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={5.8} sx={{ marginTop: "1rem" }}>
            <TextField
              id="borough"
              label="Borough"
              variant="standard"
              fullWidth
              value={state.boroughValue}
              onChange={(e) =>
                dispatch({ type: "SET_BOROUGH", payload: e.target.value })
              }
              select
              sx={{
                minWidth: "380px",
                "& .MuiInputBase-root": {
                  minHeight: "48px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1rem",
                },
              }}
            >
              {state.areaValue === "Inner London"
                ? innerLondonOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                : ""}
              {state.areaValue === "Outer London"
                ? outerLondonOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                : ""}
            </TextField>
          </Grid>
        </Grid>
        <Grid item container className="map-container">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={14}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker> */}
          </MapContainer>
        </Grid>
        <Grid container justifyContent="center" sx={{ marginTop: "1rem" }}>
          <Button variant="contained" type="submit" sx={registerBtn}>
            SUBMIT
          </Button>
        </Grid>
      </form>
    </div>
  );
}

export default AddProperty;
