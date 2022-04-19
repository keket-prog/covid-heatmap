import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import React from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  /* state */

  /*authentication token*/
  let [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );

  /* gets the user name from the auth token*/
  let [user, setUser] = useState(() =>
    localStorage.getItem("authToken")
      ? jwt_decode(localStorage.getItem("authToken"))
      : null
  );

  /* used to trigger a new token being generated*/
  let [loading, setLoading] = useState(true);

  const history = useNavigate();

  /*function to login the user and get the auth token */

  let loginUser = async (e) => {
    e.preventDefault();

    console.log(">>> Login details submitted <<<");

    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    console.log(data);
    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      console.log(`>>>User ${user} is logged in <<<`);
      localStorage.setItem("authToken", JSON.stringify(data));
    } else {
      alert("could not authenticate user");
    }
    console.log({ authToken });
  };

  /* Register user */

  let registerUser = async (e) => {
    e.preventDefault();

    console.log(">>> Registration details submitted <<<");

    let response = await fetch("http://127.0.0.1:8000/api/users/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    console.log(data);
    if (response.status === 200) {
      setAuthToken(data.token);
      setUser(jwt_decode(data.token.access));
      console.log(`>>>User ${{ user }} is logged in <<<`);
      localStorage.setItem("authToken", JSON.stringify(data.token));
    } else {
      alert("could not authenticate user");
    }
    console.log({ authToken });
  };

  //logout user
  let logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    history("/");
  };

  //gets new access token using the refresh token
  let updateToken = async () => {
    console.log(">>> Updating Token <<<", { authToken });
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authToken?.refresh,
      }),
    });
    let data = await response.json();
    console.log(data);
    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
      history("/"); // this replaces history.push('/)
    } else {
      logoutUser();
    }
    if (loading) {
      setLoading(false);
    }
    console.log({ authToken });
  };

  //populates contextData with state
  let contextData = {
    user: user,
    authToken: authToken,
    logoutUser: logoutUser,
    loginUser: loginUser,
    registerUser: registerUser,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    // calls updateToken every 4 minutes
    let fourMinutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, fourMinutes);

    return () => clearInterval(interval); //clears interval so that an endless loop isn't created
  }, [authToken, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
