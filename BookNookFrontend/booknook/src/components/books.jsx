import React, { useContext } from "react";
import { Container, Grid } from "semantic-ui-react";
import Book from "./book";
import axios from "axios";
import baseURL from "../urls/url";

class Books extends React.Component {
  state = { books: [] };
  componentDidMount() {
    axios({
      method: "get",
      url: baseURL + "/books/",
    })
      .then((res) => this.setState({ books: res.data.results }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <Container>
          <div style={{ marginTop: "30px" }}>
            <Grid columns={3} container doubling stackable>
              {this.state.books.map(
                ({ id, name, author, image, is_sold, timestamp, price }) => {
                  return (
                    <Grid.Column key={id}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Book
                          name={name}
                          author={author}
                          image={image}
                          is_sold={is_sold}
                          timestamp={timestamp}
                          id={id}
                          price={price}
                        />
                      </div>
                    </Grid.Column>
                  );
                }
              )}
            </Grid>
          </div>
        </Container>
      </>
    );
  }
}

export default Books;
