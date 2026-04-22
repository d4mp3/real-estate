import Axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router";

// MUI
import {
  Box,
  IconButton,
  Breadcrumbs,
  Link,
	CircularProgress,
	Grid,
	Typography
} from "@mui/material";

import RoomIcon from '@mui/icons-material/Room';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CheckBoxIcon from '@mui/icons-material/CheckBox';



function ListingDetail() {
  const navigate = useNavigate();
  const params = useParams();

	const initialState = {
		dataIsLoading: true,
		listingInfo: {},
	};

	function ReducerFunction(state, action) {
		switch (action.type) {
      case "CATCH_LISTING_INFO":
        return {
          ...state,
          listingInfo: action.listingObject ?? {},
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

  const listingPictures = [
    state.listingInfo?.picture1,
    state.listingInfo?.picture2,
    state.listingInfo?.picture3,
    state.listingInfo?.picture4,
    state.listingInfo?.picture5,
  ].filter(Boolean);

  const [currentPicture, setCurrentPicture] = useState(0);

  function NextPicture() {
    if (listingPictures.length === 0) return;

    if (currentPicture === listingPictures.length - 1) {
      setCurrentPicture(0);
    } else {
      setCurrentPicture(currentPicture + 1);
    }
  }

  function PreviousPicture() {
    if (listingPictures.length === 0) return;

    if (currentPicture === 0) {
      setCurrentPicture(listingPictures.length - 1);
    } else {
      setCurrentPicture(currentPicture - 1);
    }
  }

  const date = new Date(state.listingInfo.date_posted);
  const formattedDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

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

      {/* Image slider */}
      {listingPictures.length > 0 ? (
        <Grid item container justifyContent="center" sx={{ mt: 2 }}>
          <Box
            sx={{
              position: 'relative',
              width: { xs: '100%', md: '45rem' },
              maxWidth: '45rem',
              height: { xs: '18rem', md: '35rem' },
              overflow: 'hidden',
              borderRadius: 1,
            }}
          >
            <img
              src={listingPictures[currentPicture]}
              alt={`Listing ${currentPicture + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />

            <IconButton
              onClick={PreviousPicture}
              sx={{
                position: 'absolute',
                top: '50%',
                left: 8,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0, 0, 0, 0.45)',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
              }}
            >
              <ArrowCircleLeftIcon sx={{ fontSize: '2.2rem', color: '#fff' }} />
            </IconButton>

            <IconButton
              onClick={NextPicture}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 8,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0, 0, 0, 0.45)',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
              }}
            >
              <ArrowCircleRightIcon sx={{ fontSize: '2.2rem', color: '#fff' }} />
            </IconButton>
          </Box>
        </Grid>
      ) : ''}

      {/* More Information */}
      <Grid item container style={{padding: '1rem', border: '1px solid black', marginTop: '1rem'}}>
        <Grid item container xs={7} direction='column' spacing={1}>
          <Grid item>
            <Typography variant="h5">{state.listingInfo.title}</Typography>
          </Grid>
          <Grid item>
            <RoomIcon />{" "}
            <Typography variant="h6" >
              {state.listingInfo.borough}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" >{formattedDate}</Typography>
          </Grid>
        </Grid>
        <Grid item container xs={5} alignItems="center" >
            <Typography variant="h6" style={{fontWeight: 'bolder', color: 'green'}} >
              {state.listingInfo.listing_type} | {" "}
              {state.listingInfo.property_status === "Sale"
                ? `$${state.listingInfo.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                : `$${state.listingInfo.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/${state.listingInfo.rental_frequency}`}
            </Typography>
          </Grid>
      </Grid>

      <Grid item container justifyContent="flex-start" style={{padding: '1rem', border: '1px solid black', marginTop: '1rem'}}>
          {state.listingInfo.rooms ? (
          <Grid item xs={2} style={{display: 'flex'}}>
            <Typography variant="subtitle1">{state.listingInfo.rooms} Rooms</Typography>
          </Grid>
          ) : ''}

        {state.listingInfo.furnished ? (
          <Grid item xs={2} style={{display: 'flex'}}>
            <CheckBoxIcon style={{color: 'green', fontSize: "2rem"}} /> <Typography variant="subtitle1">Furnished</Typography>
          </Grid>
          ) : ''}

        {state.listingInfo.pool ? (
          <Grid item xs={2} style={{display: 'flex'}}>
            <CheckBoxIcon style={{color: 'green', fontSize: "2rem"}} /> <Typography variant="subtitle1">Pool</Typography>
          </Grid>
          ) : ''}

        {state.listingInfo.elevator ? (
          <Grid item xs={2} style={{display: 'flex'}}>
            <CheckBoxIcon style={{color: 'green', fontSize: "2rem"}} /> <Typography variant="subtitle1">Elevator</Typography>
          </Grid>
          ) : ''}

        {state.listingInfo.cctv ? (
          <Grid item xs={2} style={{display: 'flex'}}>
            <CheckBoxIcon style={{color: 'green', fontSize: "2rem"}} /> <Typography variant="subtitle1">CCTV</Typography>
          </Grid>
          ) : ''}

        {state.listingInfo.parking ? (
          <Grid item xs={2} style={{display: 'flex'}}>
            <CheckBoxIcon style={{color: 'green', fontSize: "2rem"}} /> <Typography variant="subtitle1">Parking</Typography>
          </Grid>
          ) : ''}
      </Grid>


      {/* Description */}
      {state.listingInfo.description ? (
        <Grid item style={{padding: '1rem', border: '1px solid black', marginTop: '1rem'}}>
          <Typography variant="h5" style={{marginTop: '1rem'}}>Description</Typography>
          <Typography variant="h6" style={{marginTop: '1rem'}}>{state.listingInfo.description}</Typography>
        </Grid>
      ) : ''}
    </div>
  );
}
export default ListingDetail
