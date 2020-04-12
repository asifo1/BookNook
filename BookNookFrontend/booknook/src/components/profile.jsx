import React, { useContext, useState, useEffect } from "react";
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
import Cookies from "js-cookie";
import axios from "axios";

const Profile = () => {
  const { user, setUser } = useContext(userContext);
  const { completeProfile, setCompleteProfile } = useContext(
    completeprofileContext
  );

  const [error, setError] = useState(false);
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(false);

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

  const onClickSave = (e) => {
    if (!edit) {
      e.preventDefault();
      setEdit(true);
    } else {
      if (
        name === user.profile.name &&
        email === user.user.email &&
        mobile === user.profile.mobile &&
        city === user.profile.city &&
        password == "" &&
        image === user.profile.image
      ) {
        setEdit(false);
        return;
      }

      let form_data = new FormData();
      if (image !== user.profile.image)
        form_data.append("image", image, image.name);
      form_data.append("name", name);
      form_data.append("city", city);
      form_data.append("mobile", mobile);
      if (email === user.user.email) form_data.append("email", "None@None.com");
      else form_data.append("email", email);
      if (password === "") form_data.append("password", "None");
      if (password.length >= 3) form_data.append("password", password);

      const token = Cookies.get("AuthToken");

      axios({
        method: "post",
        url: `${baseURL}/profile/`,

        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
        data: form_data,
      })
        .then((res) => {
          setEdit(false);
          setUser({
            user: { username: user.user.username, email: email },
            profile: {
              name: res.data.name,
              mobile: res.data.mobile,
              city: res.data.city,
              image: res.data.image,
            },
          });
          setCompleteProfile(true);
        })
        .catch((err) => {
          setError(true);
        });
    }
  };

  useEffect(() => {
    setName(user.profile.name);
    setEmail(user.user.email);
    setMobile(user.profile.mobile);
    setCity(user.profile.city);
    setImage(user.profile.image);
  }, [user]);

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
                    completeProfile ? `${baseURL}${image}` : default_user_img
                  }
                  wrapped
                  size="medium"
                />
              </div>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                {error ? (
                  <>
                    <Message negative>
                      <Message.Header>Invalid Data!</Message.Header>
                    </Message>
                  </>
                ) : null}

                {edit ? (
                  <Form>
                    <Form.Group unstackable widths={2}>
                      <Form.Input
                        label="Name"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={handleNameChange}
                      />
                      <Form.Input
                        label="Email"
                        placeholder="Email"
                        type="email"
                        value={email}
                        required
                        onChange={handleEmailChange}
                      />
                    </Form.Group>
                    <Form.Group widths={2}>
                      <Form.Input
                        label="Mobile No"
                        placeholder="Mobile No"
                        value={mobile}
                        required
                        onChange={handleMobileChange}
                      />
                      <Form.Input
                        label="Password (Keep blank for unchange)"
                        placeholder="Password"
                        type="password"
                        onChange={handlePasswordChange}
                      />
                    </Form.Group>
                    <Form.Group widths={2}>
                      <Form.Input
                        label="City"
                        placeholder="City"
                        value={city}
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
                      color={edit ? "green" : "blue"}
                      fluid
                      onClick={onClickSave}
                    >
                      {edit ? "Save" : "Edit"}
                    </Button>
                  </Form>
                ) : (
                  <Form>
                    <Form.Group unstackable widths={2}>
                      <Form.Input
                        label="Name"
                        placeholder="Click Edit set Name"
                        value={name}
                        readOnly
                      />
                      <Form.Input
                        label="Email"
                        type="email"
                        value={email}
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group widths={2}>
                      <Form.Input
                        label="Mobile No"
                        placeholder="Click Edit set Mobile No"
                        value={mobile}
                        readOnly
                      />
                      <Form.Input
                        label="Password"
                        placeholder="********"
                        type="password"
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group widths={2}>
                      <Form.Input
                        label="City"
                        placeholder="Click Edit set City"
                        value={city}
                        readOnly
                      />
                      <Form.Input
                        label="Profile Picture"
                        type="file"
                        disabled
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      basic
                      color={edit ? "green" : "blue"}
                      fluid
                      onClick={onClickSave}
                    >
                      {edit ? "Save" : "Edit"}
                    </Button>
                  </Form>
                )}
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Profile;
