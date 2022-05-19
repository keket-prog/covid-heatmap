import React from "react";
import { Route, Navigate } from "react-router-dom"; // Navigate replaces Redirect
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// The props are the children of the component and the rest of the parameters like the path, exact etc.
const PrivateRoute = ({ children, ...rest }) => {
  console.log(">>> PrivateRoute <<<");

  //const isAuth = false;
  let { user } = useContext(AuthContext);

  return (
    <React.Fragment {...rest}>
      {!user ? <Navigate to="/login" /> : children}
    </React.Fragment>
  );
};

export default PrivateRoute;
