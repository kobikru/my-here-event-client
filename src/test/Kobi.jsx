import { useEffect, useState } from "react";
import Map from "../components/Map";

export default function Kobi() {
  const [markerArray, setMarkerArray] = useState([
    { lat: 32.0278258952654, lng: 35.26023322753906 },
    {lat: 31.907828329767707, lng: 35.37833625488281},
    {lat: 31.98939715102185, lng: 35.333017651367186}
  ]);
  const [mainMarker, setMainMarker] = useState();
  useEffect(()=>{
    console.log(markerArray,mainMarker);
  },[markerArray,mainMarker])
  return (
    <>
      <Map
        marker={markerArray}
        setMarker = {latLng=>setMainMarker(latLng)}
        mainMarker={mainMarker}
      />
    </>
  );
}
