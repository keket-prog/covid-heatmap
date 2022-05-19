import React, { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

//Material UI Components
import { Tooltip } from "@mui/material";

const QueryStats = () => {
  let { covidData, globalCovidData } = useContext(AuthContext);
  const [queryData, setQueryData] = useState(null);

  const submitSearch = (e) => {
    e.preventDefault();

    var searchData = covidData.filter(
      (data) => data.country === e.target.value
    );
    setQueryData(searchData);
  };

  return (
    <div>
      <div className="heatmapWrapper">
        <div className="heatmapContainer">
          <div className="heatmapHeader">
            <h1 date-testid="login-header">Query Covid Stats</h1>
          </div>

          <div>
            <form onSubmit={submitSearch} className="loginForm">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Enter search criteria"
              />{" "}
              <br />
              <br />
              <Tooltip title="Query Covid data">
                <input type="submit" className="heatmapbtn" value="Search" />
              </Tooltip>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryStats;
