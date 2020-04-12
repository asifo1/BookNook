import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import icon from "../asstes/icon.webp";
import axios from "axios";
import baseURL from "../urls/url";
import authContext from "../context/authContext";
import Cookies from "js-cookie";
import completeprofileContext from "../context/completeprofileContext";
import userContext from "../context/userContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { auth, setAuth } = useContext(authContext);
  const { completeProfile, setCompleteProfile } = useContext(
    completeprofileContext
  );
  const { user, setUser } = useContext(userContext);
  const handleUernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOnClick = async (e) => {
    if (username.length === 0 || password.length === 0) return;
    let data = {
      username_email: username,
      password: password,
    };
    await axios({
      method: "post",
      url: baseURL + "/login/",
      data,
    })
      .then((res) => {
        if (res.status === 200) {
          setError(false);
          setAuth(true);
          Cookies.set("AuthToken", res.data.token, { expires: 7 });

          if (res.data.is_profile === "true") {
            const value = res.data.is_profile === "true" ? true : false;
            setCompleteProfile(value);
            setUser({ user: res.data.user, profile: res.data.profile });
          }
        }
      })
      .catch((err) => setError(true));
  };

  const readCookie = () => {
    const token = Cookies.get("AuthToken");

    axios({
      method: "post",
      url: baseURL + "/isuser/",
      data: { token: token },
    })
      .then((res) => {
        if (res.status === 200 && res.data.is_valid === "true") {
          setAuth(true);

          const value = res.data.is_profile === "true" ? true : false;
          setCompleteProfile(value);
          setUser({ user: res.data.user, profile: res.data.profile });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <>
      {auth ? <Redirect to="/" /> : null}
      <Grid
        textAlign="center"
        style={{ height: "80vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            <Image src={icon} /> Login to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              {error ? (
                <>
                  <Message negative>
                    <Message.Header>
                      Invalid credentials. Login Failed!
                    </Message.Header>
                  </Message>
                </>
              ) : null}
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username or E-mail address"
                onChange={handleUernameChange}
                required
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={handlePasswordChange}
                required
              />

              <Button color="blue" fluid size="large" onClick={handleOnClick}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Create New Account. <Link to="/signup">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};
export default LoginForm;
