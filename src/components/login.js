import React, { Component } from "react";

//Bootstrap Components
import Alert from "react-bootstrap/Alert";

//Material UI Components
import { Tooltip } from "@mui/material";

export default class login extends Component {
  state = {
    email: "",
    password: "",
    error: null,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="heatmapWrapper">
        <div className="heatmapContainer">
          <div className="heatmapHeader">
            <h1 date-testid="login-header">Login</h1>
          </div>
          {this.state.error ? (
            <Alert variant="danger">
              <Alert.Heading> Error</Alert.Heading>
              <p>{this.state.error}</p>
            </Alert>
          ) : null}
          <div className="loginForm">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email ..."
              onChange={this.onChange}
            ></input>{" "}
            <br />
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password ..."
              onChange={this.onChange}
            ></input>{" "}
            <br />
            <br />
            <Tooltip title="Log into account">
              <button className="heatmapbtn" onClick={this.loginUser}>
                Login
              </button>
            </Tooltip>
            <a className="text-color" href="/register">
              <p>Create an Account</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
