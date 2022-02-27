import React, { Component } from "react";

//Bootstrap Components
import Alert from "react-bootstrap/Alert";

//Material UI Components
import { Tooltip } from "@mui/material";

export default class SignUp extends Component {
  state = {
    user_name: "",
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
            <h1>Register Account</h1>
          </div>
          {this.state.error ? (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              <p>{this.state.error}</p>
            </Alert>
          ) : null}
          <br />
          <div className="signupForm">
            <input
              type="text"
              id="user_name"
              name="user_name"
              placeholder="User name ..."
              onChange={this.onChange}
            ></input>{" "}
            <br />
            <br />
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
            <button className="heatmapbtn" onClick={this.Register}>
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}
