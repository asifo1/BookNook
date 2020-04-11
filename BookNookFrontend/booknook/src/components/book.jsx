import React, { useState } from "react";
import {
  Card,
  Loader,
  Dimmer,
  Label,
  Header,
  Image,
  Modal,
  Icon,
} from "semantic-ui-react";
import axios from "axios";
import baseURL from "../urls/url";

const Book = (props) => {
  const { id, name, author, image, is_sold, timestamp, price } = props;
  const [seller, setSeller] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    image: "",
  });

  const handleOnClick = () => {
    axios({
      method: "get",
      url: `${baseURL}/book/${id}`,
      headers: {
        Authorization: `Token ${props.token}`,
      },
    })
      .then((res) =>
        setSeller({
          name: res.data.profile.name,
          email: res.data.user.email,
          mobile: res.data.profile.mobile,
          city: res.data.profile.city,
          image: baseURL + res.data.profile.image,
        })
      )
      .catch((err) => console.log(err));
  };

  const mailto = "mailto: " + seller.email;
  const mobileto = "tel:" + seller.mobile;

  return (
    <div style={{ margin: "7px" }}>
      <Modal
        centered={false}
        trigger={
          <Card onClick={handleOnClick} style={{ height: "100%" }}>
            <Dimmer deactive>
              <Loader size="medium">Loading</Loader>
            </Dimmer>
            <Image src={image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Description>{author}</Card.Description>
              <Card.Meta>
                <Icon name="clock outline" /> {timestamp}
              </Card.Meta>
              <h4>
                {is_sold ? (
                  <Label tag color="red">
                    <h4>
                      <Icon name="ban" />
                      Sold
                    </h4>
                  </Label>
                ) : (
                  <Label tag color="green">
                    <h4> &#2547; {price}</h4>
                  </Label>
                )}
              </h4>
            </Card.Content>
            <Card.Content extra></Card.Content>
          </Card>
        }
      >
        <Modal.Header>{name}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src={image} />
          <Modal.Description>
            <Header>
              {name} | {author}
              <h5 style={{ marginTop: "8px" }}>
                <Icon name="clock outline" /> {timestamp}
              </h5>
            </Header>
            <h4>
              {is_sold ? (
                <Label tag color="red">
                  <h4>
                    <Icon name="ban" />
                    Sold
                  </h4>
                </Label>
              ) : (
                <Label tag color="green">
                  <h4> &#2547; {price}</h4>
                </Label>
              )}
            </h4>

            <h4 style={{ cursor: "pointer" }}>
              <Image src={seller.image} avatar />
              <span>{seller.name}</span>
            </h4>
            <h4>
              <Icon name="mail outline" />
              <a href={mailto} style={{ color: "black" }}>
                {seller.email}
              </a>
            </h4>

            <h4>
              <Icon name="phone" />
              <a href={mobileto} style={{ color: "black" }}>
                {seller.mobile}
              </a>
            </h4>
            <h4>
              <Icon name="location arrow" />
              {seller.city}
            </h4>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Book;
