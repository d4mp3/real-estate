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
	CircularProgress,
	Grid,
	Typography
} from "@mui/material";

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';



function AgencyDetail() {
  const navigate = useNavigate();
	const GlobalState = useContext(StateContext);
  const params = useParams();

	const initialState = {
		userProfile: {
			agencyName: "",
			phoneNumber: "",
			profilePic: "",
			bio: "",
			sellerId: "",
			sellerListings: [],
		},
		dataIsLoading: true,
	};

	function ReducerFunction(state, action) {
		switch (action.type) {
            case "CATCH_USER_PROFILE_INFO":
                return {
                  ...state,
                  userProfile: {
                    ...state.userProfile,
                    agencyName: action.profileObject.agency_name ?? "",
                    phoneNumber: action.profileObject.phone_number ?? "",
                    profilePic: action.profileObject.profile_picture ?? "",
                    bio: action.profileObject.bio ?? "",
                    sellerId: action.profileObject.seller ?? "",
                    sellerListings: action.profileObject.seller_listings ?? [],
                  },
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
		async function GetProfileInfo() {
			try {
				const response = await Axios.get(
					`http://localhost:8000/api/profiles/${params.id}/`
				);
                console.log(response.data);
				dispatch({
					type: "CATCH_USER_PROFILE_INFO",
					profileObject: response.data,
				});
				dispatch({ type: "LOADING_DONE" });
			} catch (e) {}
		}
		GetProfileInfo();
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
    <div>
			<Grid
					container
					style={{
						width: "50%",
						marginLeft: "auto",
						marginRight: "auto",
						border: "5px solid black",
						marginTop: "1rem",
						padding: "5px",
					}}
				>
					<Grid item xs={6}>
						<img
							style={{ height: "10rem", width: "15rem" }}
							src={
								state.userProfile.profilePic
									? state.userProfile.profilePic
									: defaultProfilePicture
							}
						/>
					</Grid>
					<Grid
						itemccc
						container
						direction="column"
						justifyContent="center"
						xs={6}
					>
						<Grid item>
							<Typography
								variant="h5"
								style={{ textAlign: "center", marginTop: "1rem" }}
							>
								<span style={{ color: "green", fontWeight: "bolder" }}>
									{state.userProfile.agencyName}
								</span>
							</Typography>
						</Grid>
						<Grid item>
							<Typography
								variant="h5"
								style={{ textAlign: "center", marginTop: "1rem" }}
							>
								<IconButton>
									<LocalPhoneIcon /> {state.userProfile.phoneNumber}
								</IconButton>
							</Typography>
						</Grid>
					</Grid>
					<Grid item style={{ marginTop: "1rem", padding: "2px" }}>
						{state.userProfile.bio ? state.userProfile.bio : "No bio provided."}{}
					</Grid>
			</Grid>
			<Grid
				container
				justifyContent="flex-start"
				spacing={2}
				style={{
						padding: "10px",
				}}
			>
				{state.userProfile.sellerListings.map((listing) => {
					return (
						<Grid
							item
							key={listing.id}
							style={{ marginTop: "1rem", maxWidth: "20rem" }}
						>
							<Card>
								<CardMedia
									style={{ height: 140, cursor: "pointer" }}
									image={
										`http://localhost:8000${listing.picture1}` ? `http://localhost:8000${listing.picture1} `: defaultProfilePicture}
									alt="Listing Picture"
					onClick={() => navigate(`/listings/${listing.id}`)}
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{listing.title}
									</Typography>
									<Typography variant="body2" style={{ color: 'text.secondary' }}>
										{listing.description.substring(0, 100)}...
									</Typography>
								</CardContent>
								<CardActions>
									{listing.property_status === "Sale"
										? `${listing.listing_type}: $ ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
										: `${listing.listing_type}: $ ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/${listing.rental_frequency}`}
								</CardActions>
							</Card>
						</Grid>
						);
					})}
			</Grid>
    </div>
  )
}

export default AgencyDetail