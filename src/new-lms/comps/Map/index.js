import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Box } from "@mui/material";
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
const Map = () => {
    const position = [35.73098021435048, 51.35044235766309]

    return (
        <Box sx={{ width: { xs: "300px", md: "70%" }, height: "40vh" }}>
            <MapContainer style={{
                width: '100%', height: '100%', margin: '0 auto',
                border: 'rgba(21, 27, 27, 1) solid 3px', zIndex: 0
            }} center={position} zoom={20} scrollWheelZoom={true} >
                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                    url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
                />
                <Marker position={position}>
                    <Popup>
                        aqua
                    </Popup>
                </Marker>
            </MapContainer >
        </Box>
    );
}

export default Map;