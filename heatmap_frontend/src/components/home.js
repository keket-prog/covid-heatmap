import React, { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

//Material UI components
import { Tooltip } from "@mui/material";

//mapbox
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia3RvaDAwMSIsImEiOiJja3c0cG5waWowNm83Mm9yaHlnOGR1a2pmIn0.bqHDlPp7lU6GzPqk7LRacg";

//Component to display the home page for all users
export default function HomePage() {
  //covid data from authcontext
  let { covidData, globalCovidData } = useContext(AuthContext);
  const mapContainer = useRef(null);
  //const map = useRef(null);
  //lng and lat to Johannesburg SA
  const [lng, setLng] = useState(24);
  const [lat, setLat] = useState(-29);
  const [zoom, setZoom] = useState(4);

  //COVID data
  // const mapData = covidData.forEach((data) => {
  //   const { CountryCode } = data;
  //   console.log(CountryCode);
  // });
  let el = document.createElement("div");
  el.id = "marker";

  useEffect(() => {
    // if (map.current) return; // initialize map only once
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
    });
    if (!covidData) return;
    // Creates a marker for each covid data point
    covidData.forEach((location) => {
      var marker = new mapboxgl.Marker({ color: "#e63946" })
        .setLngLat([location.countryInfo.long, location.countryInfo.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 20, className: "map-popup" }).setHTML(
            "<h6>" +
              location.country +
              "</h6>" +
              "<p>New Deaths: " +
              location.todayDeaths +
              "</p>" +
              "<p> New Cases: " +
              location.todayCases +
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
            <div>
              Global Cases: {globalCovidData.cases} | Global Deaths:{" "}
              {globalCovidData.deaths} | Zoom: {zoom}
            </div>
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
}
