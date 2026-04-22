import Axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router";

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
  IconButton,
  Breadcrumbs,
  Link,
	CircularProgress,
	Grid,
	Typography
} from "@mui/material";

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';


function ListingDetail() {
  const navigate = useNavigate();
	const GlobalState = useContext(StateContext);
  const params = useParams();

	const initialState = {
		dataIsLoading: true,
    listingInfo: "",
	};

	function ReducerFunction(state, action) {
		switch (action.type) {
      case "CATCH_LISTING_INFO":
        return {
          ...state,
          listingInfo: action.listingObject ?? "",
      };
			case "LOADING_DONE":
				return { ...state, dataIsLoading: false };
          default:
            return state;
	  }
  }
	const [state, dispatch] = useReducer(ReducerFunction, initialState);

	// request to get profile info
	useEffect(() => {
		async function GetListingInfo() {
			try {
				const response = await Axios.get(
					`http://localhost:8000/api/listings/${params.id}/`
				);
                console.log(response.data);
				dispatch({
					type: "CATCH_LISTING_INFO",
					listingObject: response.data,
				});
				dispatch({ type: "LOADING_DONE" });
			} catch (e) {}
		}
		GetListingInfo();
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
    <div style={{marginLeft: '2rem', marginRight: '2rem', marginBottom: '2rem'}}>
      <Grid item style={{marginTop: '1rem'}}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate(`/listings`)}
            style={{ cursor: "pointer" }}
          >
            Listings
          </Link>
          <Typography sx={{ color: 'text.primary' }}>{state.listingInfo.title}</Typography>
        </Breadcrumbs>
      </Grid>
    </div>
  );
}
export default ListingDetail