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
    JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  /* used to trigger a new token being generated*/
  let [loading, setLoading] = useState(true);

  /* state for covid data for the standard user*/
  let [covidData, setCovidData] = useState(null);
  let [globalCovidData, setGlobalCovidData] = useState(null);
  const history = useNavigate();

  /*function to login the user and get the auth token */

  let loginUser = async (e) => {
    e.preventDefault();

    // console.log(">>> Login details submitted <<<");

    let response = await fetch("/api/token/", {
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
      setUser(data);
      //console.log(`>>>User ${{ user }} is logged in <<<`);
      localStorage.setItem("authToken", JSON.stringify(data));
      localStorage.setItem("user", JSON.stringify(data));
      history("/heatmap");
    } else {
      alert("could not authenticate user");
    }
  };

  /* Register user */

  let registerUser = async (e) => {
    e.preventDefault();

    let response = await fetch("/api/users/register/", {
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

    if (response.status === 200) {
      setAuthToken(data.token);
      setUser(data);

      localStorage.setItem("authToken", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data));
      history("/heatmap");
    } else {
      alert("could not authenticate user");
    }
  };

  //logout user
  let logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    history("/");
  };

  //gets new access token using the refresh token
  let updateToken = async () => {
    let response = await fetch("/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authToken?.refresh,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthToken(data);
      setUser(JSON.parse(localStorage.getItem("user")));
      localStorage.setItem("authToken", JSON.stringify(data));
      history("/heatmap"); // this replaces history.push('/)
    } else {
      logoutUser();
    }
    if (loading) {
      setLoading(false);
    }
  };

  /* get covid data - all countries */
  let getCovidData = async () => {
    // console.log(">>> Getting COVID data <<<");
    let response = await fetch("/api/covid/all/");
    let data = await response.json();

    setCovidData(data);
  };

  /* Get global covid data */
  let getGlobalCovidData = async () => {
    //console.log(">>> Getting Global COVID data <<<");
    let response = await fetch("/api/covid/global/");
    let data = await response.json();

    setGlobalCovidData(data);
  };

  //populates contextData with state
  let contextData = {
    user: user,
    authToken: authToken,
    logoutUser: logoutUser,
    loginUser: loginUser,
    registerUser: registerUser,
    covidData: covidData,
    globalCovidData: globalCovidData,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
      getCovidData();
      getGlobalCovidData();
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
