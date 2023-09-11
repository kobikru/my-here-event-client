import styles from "./style.module.css";
import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import LocationSearchInput from "../LocationSearchInput";
const libraries = ["places"];
export default function Map({
  marker,
  setMarker,
  center = { lat: 31.94864, lng: 35.2568 },
  mainMarker,
}) {
  const google = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLE_MAPS,
    libraries,
  });
  if (!google.isLoaded) return <div>Loading...</div>;
  return (
    <MapIn
      marker={marker}
      setMarker={setMarker}
      center={center}
      mainMarker={mainMarker}
    />
  );
}


function MapIn({ marker, setMarker, center, mainMarker }) {
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  return (
    <>
      <div className={styles.places_container}>
        <LocationSearchInput setSelected={setSelected} />
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName={styles.map}
        onClick={(e) => {
          const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          setMarker(latLng);
        }}
      >
        <Marker
          position={mainMarker}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
        {marker.length > 0 &&
          marker.map((mark) => (
            <Marker
              position={mark}
              onClick={(e) => {
                const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                setSelected((prev) =>
                  prev.filter(
                    (v) => v.lat !== latLng.lat && v.lng !== latLng.lng
                  )
                );
              }}
            />
          ))}
      </GoogleMap>
    </>
  );
}
