import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import { Icon } from 'leaflet';
import styles from './Listings.module.css';

// MUI
import { Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';


// Map icons
import houseIconPng from '../Assets/Mapicons/house.png';
import apartmentIconPng from '../Assets/Mapicons/apartment.png';
import officeIconPng from '../Assets/Mapicons/office.png';

// Assets
import img1 from '../Assets/img1.jpg';
import myListings from '../Assets/Data/Dummydata';
import polygonOne from './Shape';

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

  const [latitude, setLatitude] = useState(52.230);
  const [longitute, setLongitude] = useState(21.011);

  function GoEast() {
    setLatitude(12);
    setLongitude(52);
  }

  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        {myListings.map((listing) => {
          return (
            <>
              {/* <Card key={listing.id}>
              <CardHeader

                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                title={listing.title}
              />
              <CardMedia
                component="img"
                image={listing.picture1}
                alt={listing.title}
              />
              <CardContent>
                <Typography variant="body2">
                    {listing.description.substring(0, 150)}...
                </Typography>
              </CardContent>

                <CardHeader

                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                title={listing.title}
              />
              <CardMedia
                component="img"
                image={listing.picture1}
                alt={listing.title}
              />
              <CardContent>
                <Typography variant="body2">
                    {listing.description.substring(0, 150)}...
                </Typography>
              </CardContent>

          <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              </CardActions>
            </Card> */}

              <div className={styles.card} key={listing.id}>
                <p className={styles.cardTitle}>{listing.title}</p>
                <img className={styles.cardImg} src={listing.picture1} alt={listing.title} />
                <p className={styles.cardDesc}>{listing.description.substring(0, 150)}...</p>

                {listing.property_status === "Sale" ? (
                  <p className={styles.cardPrice}>
                    {listing.listing_type}: $
                    {listing.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                ) : (
                  <p className={styles.cardPrice}>
                    {listing.listing_type}: $
                    {listing.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    / {listing.rental_frequency}
                  </p>

                )}

              </div>
            </>
          )
        })}
      </div>
      <div className={styles.map}>
        <MapContainer center={[52.230, 21.011]} zoom={14} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polygon positions={polygonOne} weight={10} color="orange"/>
          {myListings.map((listing) => {
            function IconDisplay() {
              if (listing.listing_type === 'House') {
                return houseIcon;
              }
              else if (listing.listing_type === 'Apartment') {
                return apartmentIcon;
              }
              else if (listing.listing_type === 'Office') {
                return officeIcon;
              }
            }
            return (
              <Marker
                key={listing.id}
                icon={IconDisplay()}
                position={[listing.location.coordinates[0], listing.location.coordinates[1]]}>
                <Popup>
                  <p>{listing.title}</p>
                  <img className={styles.popupImg} src={listing.picture1} />
                  <p>{listing.description.substring(0, 150)}...</p>
                  <button className={styles.popupBtn}>Details</button>
                </Popup>
              </Marker>
            )
          })}

          {/* <Marker icon={houseIcon} position={[latitude, longitute]}>
            <Popup>
              <p>Title</p>
              <img className={styles.image} src={img1} />
              <p>This is a text</p>
              <button className={styles.popupBtn}>LINK</button>
            </Popup>
          </Marker> */}
        </MapContainer>
      </div>

    </div>

  );
}

export default Listings
