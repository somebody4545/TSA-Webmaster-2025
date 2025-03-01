import React from 'react'
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
};


const center = {
    lat: 47.6062, // Example: Seattle, WA
    lng: -122.3321,
};

const Map = ({city, address}) => {
    const api_key = "AIzaSyD7T3QffKqS2HdHVFbBgRes-mN93cat3Lo"
    return (
        <LoadScript googleMapsApiKey={api_key}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} />
        </LoadScript>
    );
}

export default Map