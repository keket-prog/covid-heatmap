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

const data = [
  {
    country: "Afghanistan",
    county: null,
    updatedAt: "2022-05-10 04:20:50",
    stats: {
      confirmed: 179010,
      deaths: 7685,
      recovered: null,
    },
    coordinates: {
      latitude: "33.93911",
      longitude: "67.709953",
    },
    province: null,
  },
  {
    country: "Albania",
    county: null,
    updatedAt: "2022-05-10 04:20:50",
    stats: {
      confirmed: 275372,
      deaths: 3497,
      recovered: null,
    },
    coordinates: {
      latitude: "41.1533",
      longitude: "20.1683",
    },
    province: null,
  },
  {
    country: "Algeria",
    county: null,
    updatedAt: "2022-05-10 04:20:50",
    stats: {
      confirmed: 265800,
      deaths: 6875,
      recovered: null,
    },
    coordinates: {
      latitude: "28.0339",
      longitude: "1.6596",
    },
    province: null,
  },
  {
    country: "Andorra",
    county: null,
    updatedAt: "2022-05-10 04:20:50",
    stats: {
      confirmed: 41717,
      deaths: 153,
      recovered: null,
    },
    coordinates: {
      latitude: "42.5063",
      longitude: "1.5218",
    },
    province: null,
  },
  {
    country: "Angola",
    county: null,
    updatedAt: "2022-05-10 04:20:50",
    stats: {
      confirmed: 99287,
      deaths: 1900,
      recovered: null,
    },
    coordinates: {
      latitude: "-11.2027",
      longitude: "17.8739",
    },
    province: null,
  },
  {
    country: "Antarctica",
    county: null,
    updatedAt: "2022-05-10 04:20:50",
    stats: {
      confirmed: 11,
      deaths: 0,
      recovered: null,
    },
    coordinates: {
      latitude: "-71.9499",
      longitude: "23.347",
    },
    province: null,
  },
  {
    country: "Antigua and Barbuda",
    county: null,
    updatedAt: "2022-05-10 04:20:50",
    stats: {
      confirmed: 7663,
      deaths: 137,
      recovered: null,
    },
    coordinates: {
      latitude: "17.0608",
      longitude: "-61.7964",
    },
    province: null,
  },
  {
    country: "Argentina",
    county: null,
    updatedAt: "2022-05-10 04:20:50",
    stats: {
      confirmed: 9101319,
      deaths: 128729,
      recovered: null,
    },
    coordinates: {
      latitude: "-38.4161",
      longitude: "-63.6167",
    },
    province: null,
  },
  {
    country: "Armenia",
    county: null,
    updatedAt: "2022-05-10 04:20:50",
    stats: {
      confirmed: 422896,
      deaths: 8623,
      recovered: null,
    },
    coordinates: {
      latitude: "40.0691",
      longitude: "45.0382",
    },
    province: null,
  },
  {
    country: "Australia",
    county: null,
    updatedAt: "2022-05-10 04:20:50",
    stats: {
      confirmed: 113368,
      deaths: 56,
      recovered: null,
    },
    coordinates: {
      latitude: "-35.4735",
      longitude: "149.0124",
    },
    province: "Australian Capital Territory",
  },
];

//fetch covid data
const getData = () => {
  fetch("../covid_country_summary.json")
    .then((response) => response.json)
    .then((data) => console.log(data));
};
getData();

//Component to display the home page
export default function HomePage() {
  const mapContainer = useRef(null);
  //const map = useRef(null);
  //lng and lat to Johannesburg SA
  const [lng, setLng] = useState(24);
  const [lat, setLat] = useState(-29);
  const [zoom, setZoom] = useState(2.5);
  let [covidData, setCovidData] = useState(null);
  //COVID data
  // const mapData = covidData.forEach((data) => {
  //   const { CountryCode } = data;
  //   console.log(CountryCode);
  // });

  console.log(Global);
  useEffect(() => {
    // if (map.current) return; // initialize map only once
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
    });
    data.forEach((location) => {
      var marker = new mapboxgl.Marker()
        .setLngLat([
          location.coordinates.longitude,
          location.coordinates.latitude,
        ])
        .setPopup(
          new mapboxgl.Popup({ offset: 10 })
            .setHTML(
              "<p>Deaths: " +
                location.stats.deaths +
                "</p>" +
                "<p> Cases: " +
                location.stats.confirmed +
                "</p>"
            )
            .addTo(map)
        );
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
              Cases: {Global.TotalConfirmed} | Deaths: {Global.TotalDeaths} |
              Zoom: {zoom}
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
