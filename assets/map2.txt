"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Loader from "./Loader";

const MapComponent = ({ geoJsonData, setSelectedProvince, setSelectedCity, setViewState, setSearchOption }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  const DynamicLeafletMap = dynamic(
    () =>
      import("./LeafletMap").then((module) => module.default), // Create a seperate file
    {
      ssr: false,
      loading: () => <Loader/>,
    }
  );

  return (
    <div>
      {mapLoaded && mapContainerRef.current && (
        <DynamicLeafletMap
          geoJsonData={geoJsonData}
          setSelectedProvince={setSelectedProvince}
          setSelectedCity={setSelectedCity}
          setViewState={setViewState}
          setSearchOption={setSearchOption}
          mapContainerRef={mapContainerRef}
        />
      )}
      <div ref={mapContainerRef} style={{ width: "100%", height: "700px" }} />
    </div>
  );
};

export default MapComponent;