import React, { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

//Material UI Components
import { Tooltip } from "@mui/material";

// Bootstrap
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
//import "bootstrap/dist/css/bootstrap.min.css";

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
      <div className="searchWrapper">
        <div className="searchContainer">
          <div className="searchHeader">
            <h1>Search Covid Stats</h1>
          </div>

          <div>
            <form onSubmit={submitSearch}>
              <Row>
                <Col>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Enter search criteria ..."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Col>
                <Col>
                  <Tooltip title="Query Covid data">
                    <input type="submit" className="searchbtn" value="Search" />
                  </Tooltip>
                </Col>
              </Row>
            </form>
          </div>
        </div>
        <div className="carouselWrapper">
          <Carousel variant="dark" fade>
            {queryData === null ? (
              <Carousel.Item>
                {" "}
                {/* <Carousel.Caption> */}
                <Card style={{ width: "18rem", padding: "15px" }}>
                  <Card.Title></Card.Title>
                  <Card.Body>
                    <h5>
                      Please search for a country or continent to display Covid
                      Stats{" "}
                    </h5>
                  </Card.Body>
                </Card>{" "}
                {/* </Carousel.Caption> */}
              </Carousel.Item>
            ) : (
              queryData.map((data) => (
                <Carousel.Item key={data.index} interval={null}>
                  <Card style={{ width: "18rem", padding: "15px" }}>
                    <Card.Img variant="top" src={data.countryInfo.flag} />
                    <Card.Body>
                      <Card.Title>{data.country}</Card.Title>
                      <Card.Text>
                        <p>Cases: {data.cases}</p>
                        <p>Deaths: {data.deaths}</p>
                        <p>Population: {data.population}</p>
                        <p>Recovered: {data.recovered}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              ))
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default QueryStats;
