import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

// Bootstrap Components
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
//react router

import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  let { user, logoutUser } = useContext(AuthContext);

  const authenticatedLinks = (
    <React.Fragment>
      <Nav className="me-auto">
        <Link
          to="/heatmap"
          id="navlinks"
          className="heatmap-navlinks navbtn nav-link"
        >
          Heapmap
        </Link>
        <Link
          to="/querystats"
          id="navlinks"
          className="heatmap-navlinks navbtn nav-link"
        >
          Query Covid Stats
        </Link>
        <Nav.Link
          href="#pricing"
          id="navlinks"
          className="heatmap-navlinks"
          onClick={logoutUser}
        >
          Logout
        </Nav.Link>
      </Nav>
      <Nav>
        <Navbar.Text id="navlinks">
          {" "}
          {user && <p> Hello, {user.username}</p>}
        </Navbar.Text>
      </Nav>
    </React.Fragment>
  );

  const guestLinks = (
    <React.Fragment>
      <Nav className="me-auto">
        <Link
          to="/login"
          id="navlinks"
          className="heatmap-navlinks navbtn nav-link"
        >
          Login
        </Link>
        <Link
          to="/sign-up"
          id="navlinks"
          className=" nav-link heatmap-navlinks"
        >
          Sign-up
        </Link>
      </Nav>
    </React.Fragment>
  );

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="heatmap-navbar"
      >
        <Container>
          <Navbar.Brand href="#home">COVID-19 Heatmap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {user ? authenticatedLinks : guestLinks}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
