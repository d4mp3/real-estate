import { useState } from 'react';

// React leaflet
import { Icon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// MUI
import { AppBar, Button, Grid, Typography } from '@mui/material';

// Map icons
import apartmentIconPng from './Assets/Mapicons/apartment.png';
import houseIconPng from './Assets/Mapicons/house.png';
import officeIconPng from './Assets/Mapicons/office.png';

// Assets
import myListings from './Assets/Data/Dummydata';

function Listings() {
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


  const [latitude, setLatitude] = useState(51.48767277304141);
  const [longitude, setLongitude] = useState(-0.12727038455739081);

  const GoEast = () => {
    setLatitude(51.46567224413489);
    setLongitude(0.25727038455739081);
  };

  const GoCenter = () => {
    setLatitude(51.48767277304141);
    setLongitude(-0.12727038455739081);
  };

  return (
    <Grid container>
      <Grid item size={{xs: 3}}>
        <Button onClick={GoEast}>GO EAST</Button>
        <Button onClick={GoCenter}>GO CENTER</Button>
      </Grid>
      <Grid item size={{xs: 9}}>
        <AppBar position="sticky">
          <div className="leaflet-container">
            <MapContainer center={[51.505, -0.09]} zoom={14} scrollWheelZoom={true}>
              <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            {myListings.map((listing) => {
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