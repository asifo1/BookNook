import React, { useState, useContext } from "react";
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
import authContext from "../context/authContext";
import axios from "axios";
import baseURL from "../urls/url";
import Cookies from "js-cookie";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const { auth, setAuth } = useContext(authContext);

  const handleUernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOnClick = () => {
    if (username.length === 0 || password.length === 0 || email.length === 0)
      return;
    let data = {
      username: username,
      email: email,
      password: password,
    };
    axios({
      method: "post",
      url: baseURL + "/signup/",
      data,
    })
      .then((res) => {
        if (res.status === 201) {
          setError(false);
          setAuth(true);
          Cookies.set("AuthToken", res.data.token, { expires: 7 });
        }
      })
      .catch((err) => {
        setError(true);
      });
  };

  return (
    <>
      {auth ? <Redirect to="/profile" /> : null}
      <Grid
        textAlign="center"
        style={{ height: "80vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            <Image src={icon} /> Create your account
          </Header>
          <Form size="large">
            <Segment stacked>
              {error ? (
                <>
                  <Message negative>
                    <Message.Header>
                      Data already exists or Network failed!
                    </Message.Header>
                  </Message>
                </>
              ) : null}
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="username"
                placeholder="Username"
                onChange={handleUernameChange}
                required
              />
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="email"
                name="email"
                type="email"
                onChange={handleEmailChange}
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
                Sign up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already Have an Account? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};
export default SignupForm;
