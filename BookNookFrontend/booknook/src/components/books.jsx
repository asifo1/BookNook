import React, { useContext } from "react";
import {
  Container,
  Grid,
  Icon,
  Segment,
  Input,
  Message,
} from "semantic-ui-react";
import Book from "./book";
import axios from "axios";
import baseURL from "../urls/url";
import InfiniteScroll from "react-infinite-scroll-component";
import Cookies from "js-cookie";

class Books extends React.Component {
  state = {
    books: [],
    next: null,
    search_data: null,
    loading: false,
    token: Cookies.get("AuthToken"),
  };

  componentDidMount() {
    this.setState({ loading: true });

    axios({
      method: "get",
      url: baseURL + "/books/",
      headers: {
        Authorization: `Token ${this.state.token}`,
      },
    })
      .then((res) =>
        this.setState({
          books: res.data.results,
          next: res.data.next,
          loading: false,
        })
      )
      .catch((err) => console.log(err));
  }

  // wait = () => {
  //   setInterval(this.fetchBooks, 4000);
  // };
  fetchBooks = () => {
    axios({
      method: "get",
      url: this.state.next,
      headers: {
        Authorization: `Token ${this.state.token}`,
      },
    })
      .then((res) =>
        this.setState({
          books: [...this.state.books, ...res.data.results],
          next: res.data.next,
        })
      )
      .catch((err) => console.log(err));
  };

  onKeyPress = (event) => {
    if (event.key === "Enter") {
      this.onSearch();
    }
  };

  onChange = (e) => {
    this.setState({ search_data: e.target.value });
  };

  onSearch = () => {
    if (this.state.search_data === null) {
      return;
    }

    axios({
      method: "get",
      url: `${baseURL}/search/?q=${this.state.search_data}`,
      headers: {
        Authorization: `Token ${this.state.token}`,
      },
    })
      .then((res) =>
        this.setState({
          books: res.data.results,
          next: res.data.next,
        })
      )
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <InfiniteScroll
          dataLength={this.state.books.length}
          // next={this.wait}
          next={this.fetchBooks}
          hasMore={this.state.next === null ? false : true}
          endMessage={
            <h4 align="center" style={{ margin: "60px auto 20px auto" }}>
              <a href="#">
                <Icon name="arrow up" size="large" />
                Go to Top
              </a>
            </h4>
          }
          loader={
            <h4
              align="center"
              className="loader"
              style={{ margin: "30px", fontSize: "19px" }}
            >
              <Icon name="connectdevelop" size="large" />
              Loading...
            </h4>
          }
        >
          <Container>
            <div style={{ marginTop: "30px" }}>
              <Segment>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "40px",
                  }}
                >
                  <Input
                    placeholder="Search..."
                    size="huge"
                    action={{
                      icon: "search",
                      color: "blue",
                      onClick: () => this.onSearch(),
                    }}
                    onKeyPress={this.onKeyPress}
                    onChange={this.onChange}
                  />
                </div>
              </Segment>
            </div>
            {this.state.loading ? (
              <div style={{ marginTop: "30px" }}>
                <Message icon>
                  <Icon name="circle notched" loading />
                  <Message.Content>
                    <Message.Header>Just one second</Message.Header>
                    We are fetching data for you.
                  </Message.Content>
                </Message>
              </div>
            ) : null}

            {this.state.books.length === 0 && !this.state.loading ? (
              <div style={{ marginTop: "30px" }}>
                <Message
                  icon="search"
                  header="Sorry! No Data Found."
                  content="Please try again later, Thank you."
                />
              </div>
            ) : null}

            <div style={{ marginTop: "30px" }}>
              <Grid columns={3} container doubling stackable>
                {this.state.books.map(
                  ({ id, name, author, image, is_sold, timestamp, price }) => {
                    return (
                      <Grid.Column key={id}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            height: "100%",
                          }}
                        >
                          <Book
                            name={name}
                            author={author}
                            image={image}
                            is_sold={is_sold}
                            timestamp={timestamp}
                            id={id}
                            price={price}
                            token={this.state.token}
                          />
                        </div>
                      </Grid.Column>
                    );
                  }
                )}
              </Grid>
            </div>
          </Container>
        </InfiniteScroll>
      </>
    );
  }
}

export default Books;
