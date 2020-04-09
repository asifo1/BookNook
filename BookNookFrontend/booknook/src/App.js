import React, { useState } from "react";
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

function App() {
  const [auth, setAuth] = useState(false);
  const [completeProfile, setCompleteProfile] = useState(false);
  const [user, setUser] = useState({
    user: { username: null, email: null },
    profile: { name: null, mobile: null, city: null, image: null },
  });

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
                <PrivateRoute path="/" exact component={Books} />
                <Route path="/login" exact component={LoginForm} />
                <Route path="/signup" exact component={SignupForm} />

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
