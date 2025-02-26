"use client"; 

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ geoJsonData, setSelectedProvince, setSelectedCity, setViewState, setSearchOption }) => {
  useEffect(() => {
    if (!geoJsonData || !geoJsonData.features) return; // Ensure data is available

    // Initialize Map
    const map = L.map("map", {
      minZoom: 3,
      maxZoom: 14,
      zoomSnap: 0.25,
      scrollWheelZoom: true,
      zoom: 6, // Set an initial zoom level
    });

    // Adjusted center and bounds to focus on the southern part of Canada near the U.S.
    const canadaBounds = L.latLngBounds([
      [41.6765556, -141.00275], // South-west corner of Canada
      [60.0, -80.0], // North-east corner, close to the US border
    ]);
    map.fitBounds(canadaBounds);

    // Add base map layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    // Custom marker icon
    const markerIcon = L.divIcon({
      html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 50" width="20" height="28">
        <path fill="#0af30f" d="M17.4,0.3C7.9,0.3,0,8,0.2,17.5c0.1,3.6,1.6,6.4,3,9.1c0.5,1,14.1,23.3,14.1,23.3v0l0,0l0,0v0 
        l14.7-23.4c0.9-1.6,1.8-4,1.8-4C36.6,13.3,31.5,3.7,22.4,1C20.8,0.5,19.1,0.3,17.4,0.3z"/>
        <path fill="#ffffff" d="M17.5,26c-4.8,0-8.7-3.9-8.7-8.7c0,0,0,0,0,0c0-4.8,3.9-8.7,8.7-8.7c4.8,0,8.7,3.9,8.7,8.7 
        S22.3,26,17.5,26C17.5,26,17.5,26,17.5,26z"/>
      </svg>`,
      className: "svg-icon",
      iconSize: [20, 28],
      iconAnchor: [10, 34],
      tooltipAnchor: [20, -20],
    });

    // Add GeoJSON Points
    const layer_poi = L.geoJSON(geoJsonData.features, { // Fixed reference
      pointToLayer: (feature, latlng) =>
        L.marker(latlng, { icon: markerIcon }).bindTooltip("", { // Fixed property reference
          interactive: true,
          permanent: true,
          direction: "right",
          className: "tooltip",
        }),
      onEachFeature: (feature, layer) => {
        if (feature.properties.link !== "#") {
          layer.on("click", () => {
            const link = feature.properties.link;
            const [ city, province] = link.split("/")[2].split("-");

            console.log("Link:", link); // Ensure the link is what you expect
            console.log("Province:", province); // Ensure the province is extracted correctly
            console.log("City:", city); // Ensure the city is extracted correctly

            setSelectedCity(city); // Check if these are being set correctly
            setSelectedProvince(province);
            setSearchOption("manual");
            setViewState("showData");
          });
        }
      },
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [geoJsonData]);

  return <div id="map" style={{ width: "100%", height: "700px" }} />;
};

export default MapComponent;
