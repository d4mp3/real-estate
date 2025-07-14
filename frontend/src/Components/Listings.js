import Axios from 'axios';
import { useEffect, useState } from 'react';

// React leaflet
import { Icon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// MUI
import { AppBar, Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';

// Map icons
import apartmentIconPng from './Assets/Mapicons/apartment.png';
import houseIconPng from './Assets/Mapicons/house.png';
import officeIconPng from './Assets/Mapicons/office.png';


function Listings() {

  // fetch('http://localhost:8000/api/listings/').then(response => response.json()).then(data => {
  //   console.log(data);

  // })

  const houseIcon = new Icon({
    iconUrl: houseIconPng,
    iconSize: [40, 40],
  });

  const apartmentIcon = new Icon({
    iconUrl: apartmentIconPng,
    iconSize: [40, 40],
  });

  const officeIcon = new Icon({
    iconUrl: officeIconPng,
    iconSize: [40, 40],
  });

   const cardStyle = {
     margin: '0.5rem',
     border: '1px solid black',
     position: 'relative',
   };

   const pictureStyle = {
     paddingRight: '1rem',
     paddingLeft: '1rem',
     height: '20rem',
     width: '30rem',
   };

  // Shared styles for price display
  const priceTagStyle = {
    position: 'absolute',
    backgroundColor: 'green',
    zIndex: '1000',
    color: 'white',
    top: '10px',
    left: '20px',
    padding: '5px',
    borderRadius: '4px',
  };

  const [allListings, setAllListings] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function getAllListings() {
      try {
        const response = await Axios.get('http://localhost:8000/api/listings/', {
          cancelToken: source.token
        });
        setAllListings(response.data);
        setDataIsLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    }
    getAllListings();
    return () => {
      source.cancel();
    }
  }, []);

  if (!dataIsLoading) {
    console.log(allListings[0].location);
  }

  if (dataIsLoading) {
    return (
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        style={{ height: '100vh' }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item size={{xs: 3}}>
        {allListings.map((listing) => {
          return (
            <Card
              key={listing.id}
              sx={ cardStyle }
            >
              <CardHeader
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                title={listing.title}
              />
              <div style={{ position: 'relative' }}>
                <CardMedia
                  sx={ pictureStyle }
                  component="img"
                  image={listing.picture1}
                  alt={listing.title}
                />
                {listing.property_status === "Sale" ? (
                  <Typography sx={ priceTagStyle }>
                    {listing.listing_type}: $
                    {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Typography>
                ) : (
                  <Typography sx={ priceTagStyle }>
                    {listing.listing_type}: $
                    {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    / {listing.rental_frequency}
                  </Typography>
                )}
              </div>
              <CardContent>
                <Typography variant="body2">
                  {listing.description.substring(0, 2000)}...
                </Typography>
              </CardContent>
              {/* <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions> */}
            </Card>
          );
        })}
      </Grid>
      <Grid item size={{xs: 9}} style={{marginTop: '0.5rem'}}>
        <AppBar position="sticky">
          <div className="leaflet-container">
            <MapContainer center={[51.505, -0.09]} zoom={14} scrollWheelZoom={true}>
              <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            {allListings.map((listing) => {
              function IconDisplay(){
                if (listing.listing_type === 'House') {
                  return houseIcon;
                } else if (listing.listing_type === 'Apartment') {
                  return apartmentIcon;
                } else if (listing.listing_type === 'Office') {
                  return officeIcon;
                }
              }
              return (
                <Marker
                  key={listing.id}
                  icon={IconDisplay()}
                  position={[
                    listing.location.coordinates[0],
                    listing.location.coordinates[1]
                  ]}>
                  <Popup>
                    <Typography variant="h4">{listing.title}</Typography>
                    <img src={listing.picture1} alt="Example" style={{ width: '18rem', height: '14rem' }} />
                    <Typography variant="body1">{listing.description.substring(0, 150)}...</Typography>
                    <Button variant="contained" fullWidth>Details</Button>
                  </Popup>
                </Marker>
              )
            })}

              {/* <Marker icon={officeIcon} position={[latitude, longitude]}>
                <Popup>
                  <Typography variant="h4">A title</Typography>
                  <img src={img1} alt="Example" style={{ width: '18rem', height: '14rem' }} />
                  <Typography variant="body1">This is some text below the title</Typography>
                  <Button variant="contained" fullWidth>A link</Button>
                </Popup>
              </Marker> */}
            </MapContainer>
          </div>
        </AppBar>
      </Grid>
    </Grid>
  );
}

export default Listings