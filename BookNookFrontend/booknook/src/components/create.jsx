import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  Container,
  Grid,
  Image,
  Segment,
  Header,
  Message,
} from "semantic-ui-react";
import completeprofileContext from "../context/completeprofileContext";
import { Redirect } from "react-router-dom";
import axios from "axios";
import baseURL from "../urls/url";
import Cookies from "js-cookie";

const Create = () => {
  const { completeProfile, setCompleteProfile } = useContext(
    completeprofileContext
  );

  const [bookName, setBookName] = useState(null);
  const [created, setCreated] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authorName, setAuthorName] = useState(null);
  const [price, setPrice] = useState(null);
  const [bookImage, setBookImage] = useState(null);

  const onchangeName = (e) => {
    setBookName(e.target.value);
  };
  const onchangeAuthor = (e) => {
    setAuthorName(e.target.value);
  };
  const onchangePrice = (e) => {
    setPrice(e.target.value);
  };
  const onchangeImage = (e) => {
    setBookImage(e.target.files[0]);
  };

  const onClickCreate = () => {
    if (
      bookImage === null ||
      bookName === null ||
      authorName === null ||
      price === null
    )
      return;

    setLoading(true);
    let form_data = new FormData();
    form_data.append("image", bookImage, bookImage.name);
    form_data.append("name", bookName);
    form_data.append("author", authorName);
    form_data.append("price", price);
    form_data.append("user", 41);

    const token = Cookies.get("AuthToken");

    axios({
      method: "post",
      url: `${baseURL}/create/`,

      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
      data: form_data,
    })
      .then((res) => {
        if (res.status === 201) {
          setCreated(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <>
      {completeProfile ? null : <Redirect to="/profile" />}
      <Container>
        {created ? (
          <Message success>
            <Message.Header>
              <h4 align="center">You just Created an AD!</h4>
            </Message.Header>
          </Message>
        ) : null}

        {error ? (
          <Message negative>
            <Message.Header>
              <h4 align="center">Fill all Fields!</h4>
            </Message.Header>
          </Message>
        ) : null}
        <div style={{ marginTop: "20px" }}>
          <Header as="h2" content="Create New Ad" />
        </div>
        <div style={{ marginTop: "30px" }}>
          <Grid container columns={2} stackable>
            <Grid.Column>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  src={bookImage ? URL.createObjectURL(bookImage) : null}
                  // "https://react.semantic-ui.com/images/avatar/large/rachel.png"
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
                      label="Book Name"
                      placeholder="Book Name"
                      required
                      onChange={onchangeName}
                    />
                    <Form.Input
                      label="Author"
                      placeholder="Author"
                      required
                      onChange={onchangeAuthor}
                    />
                  </Form.Group>

                  <Form.Group widths={2}>
                    <Form.Input
                      label="Price"
                      placeholder="Price"
                      min="1"
                      required
                      type="number"
                      onChange={onchangePrice}
                    />
                    <Form.Input
                      label="Picture"
                      type="file"
                      onChange={onchangeImage}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    color="blue"
                    basic
                    fluid
                    loading={loading}
                    onClick={onClickCreate}
                    content="Create"
                  />
                </Form>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      </Container>
    </>
  );
};
export default Create;
