import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  Container,
  Grid,
  Image,
  Segment,
  Message,
} from "semantic-ui-react";
import userContext from "../context/userContext";
import completeprofileContext from "../context/completeprofileContext";
import baseURL from "../urls/url";
import default_user_img from "../asstes/default_user_img.png";

const Profile = () => {
  const { user, setUser } = useContext(userContext);
  const { completeProfile, setCompleteProfile } = useContext(
    completeprofileContext
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onClickSave = () => {
    console.log(user);
  };

  return (
    <>
      {completeProfile ? null : (
        <Message warning>
          <Message.Header>
            <h4 align="center">Complete your profile first!</h4>
          </Message.Header>
        </Message>
      )}
      <Container>
        <div style={{ marginTop: "30px" }}>
          <Grid container columns={2} stackable>
            <Grid.Column>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  src={
                    completeProfile
                      ? `${baseURL}${user.profile.image}`
                      : default_user_img
                  }
                  wrapped
                  size="medium"
                />
              </div>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Form>
                  <Form.Group unstackable widths={2}>
                    <Form.Input
                      label="Name"
                      placeholder="Name"
                      required
                      value={user.profile.name}
                      onChange={handleNameChange}
                    />
                    <Form.Input
                      label="Email"
                      placeholder="Email"
                      type="email"
                      value={user.user.email}
                      required
                      onChange={handleEmailChange}
                    />
                  </Form.Group>
                  <Form.Group widths={2}>
                    <Form.Input
                      label="Mobile No"
                      placeholder="Mobile No"
                      value={user.profile.mobile}
                      required
                      onChange={handleMobileChange}
                    />
                    <Form.Input
                      label="Password"
                      placeholder="Password"
                      type="password"
                      onChange={handlePasswordChange}
                    />
                  </Form.Group>
                  <Form.Group widths={2}>
                    <Form.Input
                      label="City"
                      placeholder="City"
                      value={user.profile.city}
                      required
                      onChange={handleCityChange}
                    />
                    <Form.Input
                      label="Profile Picture"
                      type="file"
                      name="file"
                      onChange={handleImageChange}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    basic
                    color="blue"
                    fluid
                    onClick={onClickSave}
                  >
                    Save
                  </Button>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Profile;
