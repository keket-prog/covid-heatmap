import React, { useRef, useEffect, useState } from "react";

//Material UI components
import { Tooltip } from "@mui/material";

//mapbox
import mapboxgl from "mapbox-gl";

//COVID data
const covidData = require("../covid_country_summary.json");
const countryData = require("../countries.json");
const { Countries, Global } = covidData;
Countries.forEach((country) => {
  const countryCode = country.CountryCode;
  const confirmed = country.TotalConfirmed;
  const deaths = country.TotalDeaths;
  const countryLocation = countryData.find((countryLoc) => {
    countryLoc.cca2 = country.CountryCode;
    return countryLoc.latlng;
  });
  // new mapboxgl.Marker({})
  //   .setLngLat([countryLocation[1], countryLocation[0]])
  //   .addTo(map);
});
mapboxgl.accessToken =
  "pk.eyJ1Ijoia3RvaDAwMSIsImEiOiJja3c0cG5waWowNm83Mm9yaHlnOGR1a2pmIn0.bqHDlPp7lU6GzPqk7LRacg";
//process.env.MAPBOX_KEY;
//'pk.eyJ1Ijoia3RvaDAwMSIsImEiOiJja3c0cG5waWowNm83Mm9yaHlnOGR1a2pmIn0.bqHDlPp7lU6GzPqk7LRacg';

//fetch covid data
const getData = () => {
  fetch("../covid_country_summary.json")
    .then((response) => response.json)
    .then((data) => console.log(data));
};
getData();

//Component to display the home page
const SubscribedHeatMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  //lng and lat to Johannesburg SA
  const [lng, setLng] = useState(24);
  const [lat, setLat] = useState(-29);
  const [zoom, setZoom] = useState(1.5);

  console.log(Global);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div className="mapWrapper">
      <div className="mapContainer">
        <div className="heatmapSubtext">
          {/* <p>
            Please login or register to view the dashboard. <br />
          </p> */}
          <div className="sidebar">
            <div>
              Cases: {Global.TotalConfirmed} | Deaths: {Global.TotalDeaths} |
              Zoom: {zoom}
            </div>
          </div>
          <div ref={mapContainer} className="map-container" />
        </div>
      </div>
    </div>
  );
};

export default SubscribedHeatMap;
