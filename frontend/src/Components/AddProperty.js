import Axios from "axios";
import { useContext, useEffect, useMemo, useReducer, useRef } from "react";
import { useNavigate } from "react-router";

// React Leaflet
import {
  MapContainer,
  Marker,
  Polygon,
  TileLayer,
  useMap,
} from "react-leaflet";


// Boroughs
import Barking from "./Assets/Boroughs/Barking";
import Barnet from "./Assets/Boroughs/Barnet";
import Bexley from "./Assets/Boroughs/Bexley";
import Brent from "./Assets/Boroughs/Brent";
import Bromley from "./Assets/Boroughs/Bromley";
import Camden from "./Assets/Boroughs/Camden";
import City_of_London from "./Assets/Boroughs/City_of_London";
import Croydon from "./Assets/Boroughs/Croydon";
import Ealing from "./Assets/Boroughs/Ealing";
import Enfield from "./Assets/Boroughs/Enfield";
import Greenwich from "./Assets/Boroughs/Greenwich";
import Hackney from "./Assets/Boroughs/Hackney";
import Hamlets from "./Assets/Boroughs/Hamlets";
import Hammersmith from "./Assets/Boroughs/Hammersmith";
import Haringey from "./Assets/Boroughs/Haringey";
import Harrow from "./Assets/Boroughs/Harrow";
import Havering from "./Assets/Boroughs/Havering";
import Hillingdon from "./Assets/Boroughs/Hillingdon";
import Hounslow from "./Assets/Boroughs/Hounslow";
import Islington from "./Assets/Boroughs/Islington";
import Kensington from "./Assets/Boroughs/Kensington";
import Kingston from "./Assets/Boroughs/Kingston";
import Lambeth from "./Assets/Boroughs/Lambeth";
import Lewisham from "./Assets/Boroughs/Lewisham";
import Merton from "./Assets/Boroughs/Merton";
import Newham from "./Assets/Boroughs/Newham";
import Redbridge from "./Assets/Boroughs/Redbridge";
import Richmond from "./Assets/Boroughs/Richmond";
import Southwark from "./Assets/Boroughs/Southwark";
import Sutton from "./Assets/Boroughs/Sutton";
import Waltham from "./Assets/Boroughs/Waltham";
import Wandsworth from "./Assets/Boroughs/Wandsworth";
import Westminster from "./Assets/Boroughs/Westminster";

// MUI
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const formContainer = {
  width: "66%",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "3rem",
  border: "5px solid black",
  padding: "3rem",
};

const picturesBtn = {
  width: "55%",
  backgroundColor: "blue",
  color: "white",
  fontSize: "0.8rem",
  // marginRight: "1rem",
  border: "1px solid black",
};

const registerBtn = {
  width: "66%",
  backgroundColor: "green",
  color: "white",
  fontSize: "1.1rem",
  // marginRight: "1rem",
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

const listingTypeOptions = [
  {
    value: "",
    label: "",
  },
  {
    value: "Apartment",
    label: "Apartment",
  },
  {
    value: "House",
    label: "House",
  },
  {
    value: "Office",
    label: "Office",
  },
];

const propertyStatusOptions = [
  {
    value: "",
    label: "",
  },
  {
    value: "Sale",
    label: "Sale",
  },
  {
    value: "Rent",
    label: "Rent",
  },
];

const rentalFrequencyOptions = [
  {
    value: "",
    label: "",
  },
  {
    value: "Month",
    label: "Month",
  },
  {
    value: "Week",
    label: "Week",
  },
  {
    value: "Day",
    label: "Day",
  },
];

function AddProperty() {
  const navigate = useNavigate();
  const mapInitializedRef = useRef(false);
  const GlobalState = useContext

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
    sendRequest: 0,
    mapInstance: null,
    markerPosition: {
      lat: "51.505",
      lng: "-0.09",
    },
    uploadedPictures: [],
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
        console.log("Latitude set to:", action.payload);
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
      case "GET_MAP":
        return { ...state, mapInstance: action.payload };
      case "CHANGE_MARKER_POSITION":
        return {
          ...state,
          latitudeValue: "",
          longitudeValue: "",
          markerPosition: {
            lat: action.changeLatitude,
            lng: action.changeLongitude,
          },
        };
      case "SET_UPLOADED_PICTURES":
        return { ...state, uploadedPictures: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(ReducerFunction, initialState);

  // Clear borough value when area changes (but not on initial load)
  useEffect(() => {
    if (state.areaValue && state.boroughValue) {
      // Check if current borough value is valid for the selected area
      const currentAreaOptions =
        state.areaValue === "Inner London"
          ? innerLondonOptions
          : outerLondonOptions;
      const isValidBorough = currentAreaOptions.some(
        (option) => option.value === state.boroughValue
      );

      if (!isValidBorough) {
        dispatch({ type: "SET_BOROUGH", payload: "" });
      }
    }
  }, [state.areaValue, state.boroughValue]);

  function BoroughDisplay() {
    if (state.boroughValue === "Camden") {
      return <Polygon positions={Camden} />;
    } else if (state.boroughValue === "Greenwich") {
      return <Polygon positions={Greenwich} />;
    } else if (state.boroughValue === "Hackney") {
      return <Polygon positions={Hackney} />;
    } else if (state.boroughValue === "Hammersmith and Fulham") {
      return <Polygon positions={Hammersmith} />;
    } else if (state.boroughValue === "Islington") {
      return <Polygon positions={Islington} />;
    } else if (state.boroughValue === "Kensington and Chelsea") {
      return <Polygon positions={Kensington} />;
    } else if (state.boroughValue === "Lambeth") {
      return <Polygon positions={Lambeth} />;
    } else if (state.boroughValue === "Lewisham") {
      return <Polygon positions={Lewisham} />;
    } else if (state.boroughValue === "Southwark") {
      return <Polygon positions={Southwark} />;
    } else if (state.boroughValue === "Tower Hamlets") {
      return <Polygon positions={Hamlets} />;
    } else if (state.boroughValue === "Wandsworth") {
      return <Polygon positions={Wandsworth} />;
    } else if (state.boroughValue === "Westminster") {
      return <Polygon positions={Westminster} />;
    } else if (state.boroughValue === "City of London") {
      return <Polygon positions={City_of_London} />;
    } else if (state.boroughValue === "Barking and Dangenham") {
      return <Polygon positions={Barking} />;
    } else if (state.boroughValue === "Barnet") {
      return <Polygon positions={Barnet} />;
    } else if (state.boroughValue === "Bexley") {
      return <Polygon positions={Bexley} />;
    } else if (state.boroughValue === "Brent") {
      return <Polygon positions={Brent} />;
    } else if (state.boroughValue === "Bromley") {
      return <Polygon positions={Bromley} />;
    } else if (state.boroughValue === "Croydon") {
      return <Polygon positions={Croydon} />;
    } else if (state.boroughValue === "Ealing") {
      return <Polygon positions={Ealing} />;
    } else if (state.boroughValue === "Enfield") {
      return <Polygon positions={Enfield} />;
    } else if (state.boroughValue === "Haringey") {
      return <Polygon positions={Haringey} />;
    } else if (state.boroughValue === "Harrow") {
      return <Polygon positions={Harrow} />;
    } else if (state.boroughValue === "Havering") {
      return <Polygon positions={Havering} />;
    } else if (state.boroughValue === "Hillingdon") {
      return <Polygon positions={Hillingdon} />;
    } else if (state.boroughValue === "Hounslow") {
      return <Polygon positions={Hounslow} />;
    } else if (state.boroughValue === "Kingston upon Thames") {
      return <Polygon positions={Kingston} />;
    } else if (state.boroughValue === "Merton") {
      return <Polygon positions={Merton} />;
    } else if (state.boroughValue === "Newham") {
      return <Polygon positions={Newham} />;
    } else if (state.boroughValue === "Redbridge") {
      return <Polygon positions={Redbridge} />;
    } else if (state.boroughValue === "Richmond upon Thames") {
      return <Polygon positions={Richmond} />;
    } else if (state.boroughValue === "Sutton") {
      return <Polygon positions={Sutton} />;
    } else if (state.boroughValue === "Waltham Forest") {
      return <Polygon positions={Waltham} />;
    }
  }

  function TheMapComponent() {
    const map = useMap();

    useEffect(() => {
      if (map && !mapInitializedRef.current) {
        dispatch({ type: "GET_MAP", payload: map });
        mapInitializedRef.current = true;
      }
    }, [map]);

    return null;
  }

  //  Use effect to change the map view depending on chosen borough
  useEffect(() => {
    if (state.boroughValue === "Camden") {
      state.mapInstance.setView([51.54103467179952, -0.14870897037846917], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.54103467179952,
        changeLongitude: -0.14870897037846917,
      });
    } else if (state.boroughValue === "Greenwich") {
      state.mapInstance.setView([51.486316313935134, 0.005925763550159742], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.486316313935134,
        changeLongitude: 0.005925763550159742,
      });
    } else if (state.boroughValue === "Hackney") {
      state.mapInstance.setView([51.55421119118178, -0.061054618357071246], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.55421119118178,
        changeLongitude: -0.061054618357071246,
      });
    } else if (state.boroughValue === "Hammersmith and Fulham") {
      state.mapInstance.setView([51.496961673854216, -0.22495912738555046], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.496961673854216,
        changeLongitude: -0.22495912738555046,
      });
    } else if (state.boroughValue === "Islington") {
      state.mapInstance.setView([51.54974373783584, -0.10746608414711818], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.54974373783584,
        changeLongitude: -0.10746608414711818,
      });
    } else if (state.boroughValue === "Kensington and Chelsea") {
      state.mapInstance.setView([51.49779579272461, -0.1908227388030137], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.49779579272461,
        changeLongitude: -0.1908227388030137,
      });
    } else if (state.boroughValue === "Lambeth") {
      state.mapInstance.setView([51.457598293463874, -0.12030697867735651], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.457598293463874,
        changeLongitude: -0.12030697867735651,
      });
    } else if (state.boroughValue === "Lewisham") {
      state.mapInstance.setView([51.45263474786279, -0.017657579903930083], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.45263474786279,
        changeLongitude: -0.017657579903930083,
      });
    } else if (state.boroughValue === "Southwark") {
      state.mapInstance.setView([51.47281414549159, -0.07657080658293915], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.47281414549159,
        changeLongitude: -0.07657080658293915,
      });
    } else if (state.boroughValue === "Tower Hamlets") {
      state.mapInstance.setView([51.52222760075287, -0.03427379217816716], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.52222760075287,
        changeLongitude: -0.03427379217816716,
      });
    } else if (state.boroughValue === "Wandsworth") {
      state.mapInstance.setView([51.45221859319854, -0.1910578642162312], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.45221859319854,
        changeLongitude: -0.1910578642162312,
      });
    } else if (state.boroughValue === "Westminster") {
      state.mapInstance.setView([51.51424692365236, -0.1557886924596714], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.51424692365236,
        changeLongitude: -0.1557886924596714,
      });
    } else if (state.boroughValue === "City of London") {
      state.mapInstance.setView([51.51464652712437, -0.09207257068971077], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.51464652712437,
        changeLongitude: -0.09207257068971077,
      });
    } else if (state.boroughValue === "Barking and Dangenham") {
      state.mapInstance.setView([51.54475354441844, 0.13730036835406337], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.54475354441844,
        changeLongitude: 0.13730036835406337,
      });
    } else if (state.boroughValue === "Barnet") {
      state.mapInstance.setView([51.61505810569654, -0.20104146847921367], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.61505810569654,
        changeLongitude: -0.20104146847921367,
      });
    } else if (state.boroughValue === "Bexley") {
      state.mapInstance.setView([51.45784336604241, 0.1386755093498764], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.45784336604241,
        changeLongitude: 0.1386755093498764,
      });
    } else if (state.boroughValue === "Brent") {
      state.mapInstance.setView([51.55847917911348, -0.2623697479848262], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.55847917911348,
        changeLongitude: -0.2623697479848262,
      });
    } else if (state.boroughValue === "Bromley") {
      state.mapInstance.setView([51.37998089785619, 0.056091833685512606], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.37998089785619,
        changeLongitude: 0.056091833685512606,
      });
    } else if (state.boroughValue === "Croydon") {
      state.mapInstance.setView([51.36613815034951, -0.08597242883896719], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.36613815034951,
        changeLongitude: -0.08597242883896719,
      });
    } else if (state.boroughValue === "Ealing") {
      state.mapInstance.setView([51.52350664933499, -0.33384540332179463], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.52350664933499,
        changeLongitude: -0.33384540332179463,
      });
    } else if (state.boroughValue === "Enfield") {
      state.mapInstance.setView([51.650718869158275, -0.07999628038008409], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.650718869158275,
        changeLongitude: -0.07999628038008409,
      });
    } else if (state.boroughValue === "Haringey") {
      state.mapInstance.setView([51.591214467057085, -0.10319530898095737], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.591214467057085,
        changeLongitude: -0.10319530898095737,
      });
    } else if (state.boroughValue === "Harrow") {
      state.mapInstance.setView([51.60218606442213, -0.33540294600548437], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.60218606442213,
        changeLongitude: -0.33540294600548437,
      });
    } else if (state.boroughValue === "Havering") {
      state.mapInstance.setView([51.57230623503768, 0.2256095005492423], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.57230623503768,
        changeLongitude: 0.2256095005492423,
      });
    } else if (state.boroughValue === "Hillingdon") {
      state.mapInstance.setView([51.5430033964411, -0.4435905982156584], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.5430033964411,
        changeLongitude: -0.4435905982156584,
      });
    } else if (state.boroughValue === "Hounslow") {
      state.mapInstance.setView([51.475988836438525, -0.3660060903075389], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.475988836438525,
        changeLongitude: -0.3660060903075389,
      });
    } else if (state.boroughValue === "Kingston upon Thames") {
      state.mapInstance.setView([51.39401320084246, -0.2841003136670212], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.39401320084246,
        changeLongitude: -0.2841003136670212,
      });
    } else if (state.boroughValue === "Merton") {
      state.mapInstance.setView([51.41148120353897, -0.18805584151013174], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.41148120353897,
        changeLongitude: -0.18805584151013174,
      });
    } else if (state.boroughValue === "Newham") {
      state.mapInstance.setView([51.533282275935306, 0.031692014878610064], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.533282275935306,
        changeLongitude: 0.031692014878610064,
      });
    } else if (state.boroughValue === "Redbridge") {
      state.mapInstance.setView([51.585885574074965, 0.07764760021283491], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.585885574074965,
        changeLongitude: 0.07764760021283491,
      });
    } else if (state.boroughValue === "Richmond upon Thames") {
      state.mapInstance.setView([51.450368976651696, -0.30801386088548505], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.450368976651696,
        changeLongitude: -0.30801386088548505,
      });
    } else if (state.boroughValue === "Sutton") {
      state.mapInstance.setView([51.363672040828504, -0.1702200806863363], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.363672040828504,
        changeLongitude: -0.1702200806863363,
      });
    } else if (state.boroughValue === "Waltham Forest") {
      state.mapInstance.setView([51.59466635701797, -0.012215840493378892], 12);
      dispatch({
        type: "CHANGE_MARKER_POSITION",
        changeLatitude: 51.59466635701797,
        changeLongitude: -0.012215840493378892,
      });
    }
  }, [state.boroughValue, state.mapInstance]);

  // Draggable marker

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        dispatch({ type: "SET_LATITUDE", payload: marker.getLatLng().lat });
        dispatch({ type: "SET_LONGITUDE", payload: marker.getLatLng().lng });
      },
    }),
    []
  );

  useEffect(() => {
    if (state.uploadedPictures.length > 0) {
      dispatch({
        type: "SET_PICTURE_1",
        payload: state.uploadedPictures[0] || "",
      });
      dispatch({
        type: "SET_PICTURE_2",
        payload: state.uploadedPictures[1] || "",
      });
      dispatch({
        type: "SET_PICTURE_3",
        payload: state.uploadedPictures[2] || "",
      });
      dispatch({
        type: "SET_PICTURE_4",
        payload: state.uploadedPictures[3] || "",
      });
      dispatch({
        type: "SET_PICTURE_5",
        payload: state.uploadedPictures[4] || "",
      });
    }
  }, [state.uploadedPictures]);

  function FormSubmit(e) {
    e.preventDefault();
    console.log("Form submitted");
    dispatch({ type: "SET_SEND_REQUEST", payload: true });
  }

  useEffect(() => {
    if (state.sendRequest) {
      async function AddProperty() {
        const formData = new FormData();
        formData.append("title", state.titleValue);
        formData.append("description", state.descriptionValue);
        formData.append("area", state.areaValue);
        formData.append("borough", state.boroughValue);
        formData.append("listing_type", state.listingTypeValue);
        formData.append("property_status", state.propertyStatusValue);
        formData.append("price", state.priceValue);
        formData.append("rental_frequency", state.rentalFrequencyValue);
        formData.append("rooms", state.roomsValue);
        formData.append("furnished", state.furnishedValue);
        formData.append("pool", state.poolValue);
        formData.append("elevator", state.elevatorValue);
        formData.append("cctv", state.cctvValue);
        formData.append("parking", state.parkingValue);
        formData.append("latitude", state.latitudeValue);
        formData.append("longitude", state.longitudeValue);
        formData.append("picture1", state.picture1Value);
        formData.append("picture2", state.picture2Value);
        formData.append("picture3", state.picture3Value);
        formData.append("picture4", state.picture4Value);
        formData.append("picture5", state.picture5Value);
        formData.append("seller", state.GlobalState.userId);

        try {
          const response = await Axios.post("http://localhost:8000/api/listings/create/", formData)
          console.log(response);
        } catch(e) {
          console.log(e.response);
        }
      }
      AddProperty()
    }
  }, [state.sendRequest])

  function PriceDisplay() {
    if (
      state.propertyStatusValue === "Rent" &&
      state.rentalFrequencyValue === "Day"
    ) {
      return "Price per Day*";
    } else if (
      state.propertyStatusValue === "Rent" &&
      state.rentalFrequencyValue === "Week"
    ) {
      return "Price per Week*";
    } else if (
      state.propertyStatusValue === "Rent" &&
      state.rentalFrequencyValue === "Month"
    ) {
      return "Price per Month*";
    } else {
      return "Price*";
    }
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
            label="Title*"
            variant="standard"
            fullWidth
            value={state.titleValue}
            onChange={(e) =>
              dispatch({ type: "SET_TITLE", payload: e.target.value })
            }
          />
        </Grid>

        <Grid container justifyContent="space-between">
          <Grid item size={{ xs: 5 }} sx={{ marginTop: "1rem" }}>
            <TextField
              id="listingType"
              label="Listing Type*"
              variant="standard"
              fullWidth
              value={state.listingTypeValue}
              onChange={(e) =>
                dispatch({ type: "SET_LISTING_TYPE", payload: e.target.value })
              }
              select
            >
              {listingTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item size={{ xs: 5 }} sx={{ marginTop: "1rem" }}>
            <TextField
              id="propertyStatus"
              label="Property Status*"
              variant="standard"
              fullWidth
              value={state.propertyStatusValue}
              onChange={(e) =>
                dispatch({
                  type: "SET_PROPERTY_STATUS",
                  payload: e.target.value,
                })
              }
              select
            >
              {propertyStatusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between">
          <Grid
            item
            size={{ xs: 5 }}
            sx={{
              marginTop: "1rem",
            }}
          >
            <TextField
              id="rentalFrequency"
              label="Rental Frequency"
              variant="standard"
              disabled={state.propertyStatusValue === "Sale" ? true : false}
              fullWidth
              value={state.rentalFrequencyValue}
              onChange={(e) =>
                dispatch({
                  type: "SET_RENTAL_FREQUENCY",
                  payload: e.target.value,
                })
              }
              select
            >
              {rentalFrequencyOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item size={{ xs: 5 }} sx={{ marginTop: "1rem" }}>
            <TextField
              id="price"
              type="number"
              label={PriceDisplay()}
              variant="standard"
              fullWidth
              value={state.priceValue}
              onChange={(e) =>
                dispatch({ type: "SET_PRICE", payload: e.target.value })
              }
            />
          </Grid>
        </Grid>

        <Grid container sx={{ marginTop: "1rem" }}>
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={6}
            fullWidth
            value={state.descriptionValue}
            onChange={(e) =>
              dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
            }
          />
        </Grid>

        {state.listingTypeValue === "Office" ? (
          ""
        ) : (
          <Grid container>
            <Grid item size={{ xs: 3 }} sx={{ marginTop: "1rem" }}>
              <TextField
                id="rooms"
                label="Rooms"
                type="number"
                variant="standard"
                fullWidth
                value={state.roomsValue}
                onChange={(e) =>
                  dispatch({ type: "SET_ROOMS", payload: e.target.value })
                }
              />
            </Grid>
          </Grid>
        )}

        <Grid container justifyContent="space-between">
          <Grid item size={{ xs: 2 }} sx={{ marginTop: "1rem" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.furnishedValue}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FURNISHED",
                      payload: e.target.checked,
                    })
                  }
                />
              }
              label="Furnished"
            />
          </Grid>

          <Grid item size={{ xs: 2 }} sx={{ marginTop: "1rem" }}>
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

          <Grid item size={{ xs: 2 }} sx={{ marginTop: "1rem" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.elevatorValue}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_ELEVATOR",
                      payload: e.target.checked,
                    })
                  }
                />
              }
              label="Elevator"
            />
          </Grid>

          <Grid item size={{ xs: 2 }} sx={{ marginTop: "1rem" }}>
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

          <Grid item size={{ xs: 2 }} sx={{ marginTop: "1rem" }}>
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
        </Grid>

        <Grid container justifyContent={"space-between"} spacing={2}>
          <Grid item size={{ xs: 5 }} sx={{ marginTop: "1rem" }}>
            <TextField
              id="area"
              label="Area*"
              variant="standard"
              fullWidth
              value={state.areaValue}
              onChange={(e) =>
                dispatch({ type: "SET_AREA", payload: e.target.value })
              }
              select
            >
              {areaOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item size={{ xs: 5 }} sx={{ marginTop: "1rem" }}>
            <TextField
              id="borough"
              label="Borough*"
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
                : null}
              {state.areaValue === "Outer London"
                ? outerLondonOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                : null}
            </TextField>
          </Grid>
        </Grid>

        <Grid container className="map-container">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={14}
            scrollWheelZoom={true}
            style={{ height: "35rem" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TheMapComponent />
            {BoroughDisplay(<Polygon positions={Camden} />)}
            <Marker
              draggable
              eventHandlers={eventHandlers}
              position={state.markerPosition}
              ref={markerRef}
            ></Marker>
          </MapContainer>
        </Grid>

        <Grid container justifyContent="center" sx={{ marginTop: "1rem" }}>
          <Button variant="contained" component="label" sx={picturesBtn}>
            UPLOAD PICTURES (MAX 5)
            <input
              type="file"
              multiple
              accept="image/png, image/gif, image/jpeg"
              hidden
              onChange={(e) => {
                dispatch({
                  type: "SET_UPLOADED_PICTURES",
                  payload: e.target.files,
                });
              }}
            />
          </Button>
        </Grid>

        <Grid container justifyContent="center" sx={{ marginTop: "1rem" }}>
          <ul>
            {state.picture1Value ? <li>{state.picture1Value.name}</li> : ""}
            {state.picture2Value ? <li>{state.picture2Value.name}</li> : ""}
            {state.picture3Value ? <li>{state.picture3Value.name}</li> : ""}
            {state.picture4Value ? <li>{state.picture4Value.name}</li> : ""}
            {state.picture5Value ? <li>{state.picture5Value.name}</li> : ""}
          </ul>
        </Grid>

        <Grid container justifyContent="center" sx={{ marginTop: "1rem" }}>
          <Button variant="contained" type="submit" sx={registerBtn}>
            SUBMIT
          </Button>
        </Grid>
      </form>

      <Button
        onClick={() => console.log(state.uploadedPictures)}
        disabled={!state.mapInstance}
      >
        TEST
      </Button>
    </div>
  );
}

export default AddProperty;
