import React, { useState, useLayoutEffect } from "react";
import "./App.css";
import MyMenu from "./components/nav";
import LoginForm from "./components/login";
import SignupForm from "./components/signup";
import Books from "./components/books";
import Profile from "./components/profile";
import Create from "./components/create";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import authContext from "./context/authContext";
import userContext from "./context/userContext";
import completeprofileContext from "./context/completeprofileContext";
import Cookies from "js-cookie";
import axios from "axios";
import baseURL from "./urls/url";

function App() {
  const [auth, setAuth] = useState(false);
  const [completeProfile, setCompleteProfile] = useState(false);
  const [user, setUser] = useState({
    user: { username: null, email: null },
    profile: { name: null, mobile: null, city: null, image: null },
  });

  // const readCookie = () => {
  //   const token = Cookies.get("AuthToken");

  //   axios({
  //     method: "post",
  //     url: baseURL + "/isuser/",
  //     data: { token: token },
  //   })
  //     .then((res) => {
  //       if (res.status === 200 && res.data.is_valid === "true") {
  //         setAuth(true);
  //         const value = res.data.is_profile === "true" ? true : false;
  //         setCompleteProfile(value);
  //         setUser({ user: res.data.user, profile: res.data.profile });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setAuth(false);
  //     });
  // };

  // useLayoutEffect(() => {
  //   readCookie();
  // }, []);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      <userContext.Provider value={{ user, setUser }}>
        <completeprofileContext.Provider
          value={{ completeProfile, setCompleteProfile }}
        >
          <Router>
            <Switch>
              <React.Fragment>
                <MyMenu />

                <Route path="/login" exact component={LoginForm} />
                <Route path="/signup" exact component={SignupForm} />
                <PrivateRoute path="/" exact component={Books} />
                <PrivateRoute path="/profile" exact component={Profile} />
                <PrivateRoute path="/create" exact component={Create} />
              </React.Fragment>
            </Switch>
          </Router>
        </completeprofileContext.Provider>
      </userContext.Provider>
    </authContext.Provider>
  );
}

export default App;
