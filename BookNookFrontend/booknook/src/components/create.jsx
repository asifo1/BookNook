import React, { useContext } from "react";
import {
  Button,
  Form,
  Container,
  Grid,
  Image,
  Segment,
  Header,
} from "semantic-ui-react";
import completeprofileContext from "../context/completeprofileContext";
import { Redirect } from "react-router-dom";

const Create = () => {
  const { completeProfile, setCompleteProfile } = useContext(
    completeprofileContext
  );

  return (
    <>
      {completeProfile ? null : <Redirect to="/profile" />}
      <Container>
        <div style={{ marginTop: "20px" }}>
          <Header as="h2" content="Create New Ad" />
        </div>
        <div style={{ marginTop: "30px" }}>
          <Grid container columns={2} stackable>
            <Grid.Column>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
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
                    />
                    <Form.Input label="Author" placeholder="Author" required />
                  </Form.Group>

                  <Form.Group widths={2}>
                    <Form.Input
                      label="Price"
                      placeholder="Price"
                      min="1"
                      required
                      type="number"
                    />
                    <Form.Input label="Picture" type="file" />
                  </Form.Group>

                  <Button type="submit" color="blue" basic fluid>
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
export default Create;
