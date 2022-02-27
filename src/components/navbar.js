import React, { Component } from "react";

// Bootstrap Components
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
//react router
import { withRouter } from "../HOC/withRouterProp";
import { NavLink, Link } from "react-router-dom";

class NavBar extends Component {
  // Redirects to the login page
  login = () => {
    this.props.history.push("/login");
  };
  render() {
    const isAuthenticated = false;
    const userName = "Jon Snow";
    const authenticatedLinks = (
      <React.Fragment>
        <Nav className="me-auto">
          <Nav.Link href="#features" id="navlinks" className="heatmap-navlinks">
            Heatmap
          </Nav.Link>
          <Nav.Link href="#pricing" id="navlinks" className="heatmap-navlinks">
            Logout
          </Nav.Link>
        </Nav>
        <Nav>
          <Navbar.Text id="navlinks"> Signed in as: {userName} </Navbar.Text>
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
              {isAuthenticated ? authenticatedLinks : guestLinks}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
export default NavBar;
