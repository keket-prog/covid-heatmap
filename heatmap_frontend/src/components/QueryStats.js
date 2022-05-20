import React, { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

//Material UI Components
import { Tooltip } from "@mui/material";

const QueryStats = () => {
  let { covidData, globalCovidData } = useContext(AuthContext);
  const [queryData, setQueryData] = useState(null);
  const [search, setSearch] = useState(null);

  const submitSearch = (e) => {
    e.preventDefault();

    var searchData = covidData.filter(
      (data) => data.country === search || data.continent === search
    );
    console.log(searchData);
    if (searchData.length === 0) {
      setQueryData(null);
    } else {
      setQueryData(searchData);
    }

    console.log({ queryData });
  };

  return (
    <div>
      <div className="heatmapWrapper">
        <div className="heatmapContainer">
          <div className="heatmapHeader">
            <h1 date-testid="login-header">Search Covid Stats</h1>
          </div>

          <div>
            <form onSubmit={submitSearch} className="loginForm">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Enter search criteria"
                onChange={(e) => setSearch(e.target.value)}
              />{" "}
              <br />
              <br />
              <Tooltip title="Query Covid data">
                <input type="submit" className="heatmapbtn" value="Search" />
              </Tooltip>
            </form>

            {queryData === null ? (
              <div>
                {" "}
                <span>{search} Covid data is currently unavailable. </span>
              </div>
            ) : (
              queryData.map((data) => (
                <div key={data.index}>
                  <p>{data.country}</p>
                  <p>Cases: {data.cases}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryStats;
