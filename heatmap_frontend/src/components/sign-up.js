import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

//Bootstrap Components
import Alert from "react-bootstrap/Alert";

//Material UI Components
import { Tooltip } from "@mui/material";

const SignUp = () => {
  let { registerUser } = useContext(AuthContext);

  return (
    <div className="heatmapWrapper">
      <div className="heatmapContainer">
        <div className="heatmapHeader">
          <h1>Register Account</h1>
        </div>
        {/* {this.state.error ? (
          <Alert variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            <p>{this.state.error}</p>
          </Alert>
        ) : null} */}
        <br />
        <form onSubmit={registerUser} className="signupForm">
          <input
            type="text"
            id="user_name"
            name="name"
            placeholder="Full name ..."
          ></input>{" "}
          <br />
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email ..."
          ></input>{" "}
          <br />
          <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password ..."
          ></input>{" "}
          <br />
          <br />
          <Tooltip title="Register account">
            <input type="submit" className="heatmapbtn" value="Register" />
          </Tooltip>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
