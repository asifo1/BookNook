import React from "react";
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

const Book = (props) => {
  const { id, name, author, image, is_sold, timestamp, price } = props;

  const img = "https://react.semantic-ui.com/images/avatar/large/rachel.png";

  return (
    <div style={{ margin: "7px" }}>
      <Modal
        centered={false}
        trigger={
          <Card>
            <Dimmer deactive>
              <Loader size="medium">Loading</Loader>
            </Dimmer>
            <Image src={img} wrapped ui={false} />
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
          <Image wrapped size="medium" src={img} />
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
              <Image src="/images/wireframe/square-image.png" avatar />
              <span>Name of selller</span>
            </h4>
            <h4>
              <Icon name="mail outline" />
              <a href="mailto: abc@example.com" style={{ color: "black" }}>
                abc@example.com
              </a>
            </h4>

            <h4>
              <Icon name="phone" />
              <a href="tel:123-456-7890" style={{ color: "black" }}>
                123-456-7890
              </a>
            </h4>
            <h4>
              <Icon name="location arrow" />
              Location
            </h4>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Book;
