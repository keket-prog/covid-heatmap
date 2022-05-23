import React, { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
//Material UI components
import { Tooltip } from "@mui/material";

//mapbox
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken = "xxxx";

//Component to display the home page
const SubscribedHeatMap = () => {
  //covid data from authcontext
  let { covidData, globalCovidData } = useContext(AuthContext);
  const mapContainer = useRef(null);
  //const map = useRef(null);
  //lng and lat to Johannesburg SA
  const [lng, setLng] = useState(24);
  const [lat, setLat] = useState(-29);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    // if (map.current) return; // initialize map only once
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
    });

    // add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    if (!covidData) return;
    // Creates a marker for each covid data point
    covidData.forEach((location) => {
      const el = document.createElement("div");
      el.className = "map-marker";
      el.backgroundImage = location.countryInfo.flag;
      var marker = new mapboxgl.Marker(el)
        .setLngLat([location.countryInfo.long, location.countryInfo.lat])
        .setPopup(
          new mapboxgl.Popup({
            offset: 20,
            className: "map-popup",
          }).setHTML(
            "<h6><b>" +
              location.country +
              "</b></h6>" +
              "<p>New Deaths: " +
              location.todayDeaths +
              "</p>" +
              "<p> New Cases: " +
              location.todayCases +
              "</p>" +
              "<p> Active Cases: " +
              location.active +
              "</p>" +
              "<p> Recovered: " +
              location.recovered +
              "</p>" +
              "<p> Tests: " +
              location.tests +
              "</p>" +
              "<p>Total Deaths: " +
              location.deaths +
              "</p>" +
              "<p> Total Cases: " +
              location.cases +
              "</p>"
          )
        )
        .addTo(map);
    });

    // Add the control to the map - adds a search box on the map
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );

    //return map.remove();
  });

  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.current.on("move", () => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  // });

  return (
    <div className="mapWrapper">
      <div className="mapContainer">
        <div className="heatmapSubtext">
          {/* <p>
             Please login or register to view the dashboard. <br />
           </p> */}
          <div className="sidebar">
            {globalCovidData === null ? (
              <div>Global Cases: loading ... | Global Deaths: loading ...</div>
            ) : (
              <div>
                Global Cases: {globalCovidData.cases} | Global Deaths:{" "}
                {globalCovidData.deaths}
              </div>
            )}
          </div>
          <div ref={mapContainer} className="map-container" />
        </div>
        {/* <row>
           <Tooltip title="Go to the login page">
             <a href="/login">
               <button className="heatmapbtn">Login</button>
             </a>
           </Tooltip>
 
           <Tooltip title="Go to the sign-up page">
             <a href="/sign-up">
               <button className="heatmapbtn">Register</button>
             </a>
           </Tooltip>
         </row> */}
      </div>
    </div>
  );
};

export default SubscribedHeatMap;
