import Axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router";



// Contexts
import StateContext from "../Contexts/StateContext";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";

// MUI
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Grid,
    Typography
} from "@mui/material";


function Agencies() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);

  const initialState = {
    dataIsLoading: true,
    agenciesList: [],
  };

  function ReducerFunction(state, action) {
      switch (action.type) {
        case "CATCH_AGENCIES":
          return { ...state, agenciesList: action.agenciesArray };
        case "LOADING_DONE":
          return { ...state, dataIsLoading: false };
      }
  }

  const [state, dispatch] = useReducer(ReducerFunction, initialState);

  // request to get all profiles
  useEffect(() => {
		async function GetAgencies() {
			try {
				const response = await Axios.get(
					`http://localhost:8000/api/profiles/`
				);
                console.log(response.data);
				dispatch({
					type: "CATCH_AGENCIES",
					agenciesArray: response.data,
				});
				dispatch({ type: "LOADING_DONE" });
			} catch (e) {}
		}
		GetAgencies();
	}, []);

  	if (state.dataIsLoading === true) {
		return (
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				style={{ height: "100vh" }}
			>
				<CircularProgress />
			</Grid>
		);
	}

  return (
    <Grid
      container
      justifyContent="flex-start"
      spacing={2}
      style={{
          padding: "10px",
      }}
    >
      {state.agenciesList.map((agency) => {
        function PropertiesDisplay() {
          if (agency.seller_listings.length === 0) {
            return (
              <Button disabled size="small">
                No Properties
              </Button>
            );
          } else if (agency.seller_listings.length === 1) {
            return (
              <Button size="small" onClick={() => navigate(`/agencies/${agency.id}`)}>
                One Property
              </Button>
            );
          } else {
            return (
              <Button size="small" onClick={() => navigate(`/agencies/${agency.id}`)}>
                {agency.seller_listings.length} Properties
              </Button>
            );
          }
        }

        if (agency.agency_name && agency.phone_number)
          return (
            <Grid
              item
              key={agency.id}
              style={{ marginTop: "1rem", maxWidth: "20rem" }}
            >
              <Card>
                <CardMedia
                  style={{ height: 140}}
                  image={agency.profile_picture ? agency.profile_picture : defaultProfilePicture}
                  alt="Profile Picture"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {agency.agency_name}
                  </Typography>
                  <Typography variant="body2" style={{ color: 'text.secondary' }}>
                    {agency.bio}
                  </Typography>
                </CardContent>
                <CardActions>
                  {PropertiesDisplay()}
                </CardActions>
              </Card>
            </Grid>
            );
        })}
    </Grid>
  );
}

export default Agencies