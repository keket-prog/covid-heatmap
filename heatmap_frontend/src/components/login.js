import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

//Bootstrap Components
import Alert from "react-bootstrap/Alert";

//Material UI Components
import { Tooltip } from "@mui/material";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);
  return (
    // <div>
    //   <form onSubmit={loginUser}>
    //     <input type="text" name="username" placeholder="enter user name" />
    //     <input type="password" name="password" placeholder="password" />
    //     <input type="submit" value="Submit" />
    //   </form>
    // </div>
    <div className="heatmapWrapper">
      <div className="heatmapContainer">
        <div className="heatmapHeader">
          <h1 date-testid="login-header">Login</h1>
        </div>
        {/* {this.state.error ? (
          <Alert variant="danger">
            <Alert.Heading> Error</Alert.Heading>
            <p>{this.state.error}</p>
          </Alert>
        ) : null} */}

        <div>
          <form onSubmit={loginUser} className="loginForm">
            <input
              type="text"
              id="email"
              name="username"
              placeholder="Email ..."
            />{" "}
            <br />
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password ..."
            />{" "}
            <br />
            <br />
            <Tooltip title="Log into account">
              <input type="submit" className="heatmapbtn" value="Login" />
              {/* Login
              </input> */}
            </Tooltip>
          </form>

          {/* <form onSubmit={loginUser} className="loginForm">
            <input
              type="text"
              id="email"
              name="username"
              placeholder="enter user name..."
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />
            <input type="submit" value="Submit" className="heatmapbtn" />
          </form> */}
          <a className="text-color" href="/sign-up">
            <p>Create an Account</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
