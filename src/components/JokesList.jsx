import axios from "axios";
import Joke from "./Joke";
import { v4 as uuidv4 } from "uuid";
import React, { Component } from "react";

class JokesList extends Component {
  static defaultProps = {
    jokesNum: 10,
  };

  constructor(props) {
    super(props);
    // get jokes from localStorage
    this.state = {
      loading: false,
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
    };

    // prevent duplicate jokes with Set()
    this.seenJokes = new Set(this.state.jokes.map((joke) => joke.text));
    console.log(this.seenJokes);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // don't overwrite jokes everytime we refresh the App
    if (this.state.jokes.length === 0) this.getJokes();
  }

  async getJokes() {
    try {
      // create array of jokes
      let jokes = [];

      // get 10 jokes
      while (jokes.length < this.props.jokesNum) {
        // Load jokes
        let response = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });

        // check for duplicate jokes
        let newJoke = response.data.joke;
        if (!this.seenJokes.has(newJoke)) {
          jokes.push({ id: uuidv4(), text: newJoke, votes: 0 });
        } else {
          console.log("FIND A DUPLICATE");
          console.log(newJoke);
        }
      }

      // Update state to add new jokes when requesting new ones
      this.setState(
        (prevState) => ({
          loading: false,
          jokes: [...prevState.jokes, ...jokes],
        }),
        // Update localStorage with new jokes after the state is updated
        () =>
          window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  }

  handleVote(id, delta) {
    // find the correct joke "id" in the state and updated by adding/substacting "delta" to the votes
    this.setState(
      (prevState) => ({
        // use .map() to create a new array
        jokes: prevState.jokes.map((joke) =>
          joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
        ),
      }),
      // Update localStorage after the state is updated with votes
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }

  // Get new jokes
  handleClick() {
    this.setState({ loading: true }, this.getJokes);
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="JokesList-loader">
          <i className="far fa-8x fa-laugh fa-spin" />
          <p>Loading jokes...</p>
        </div>
      );
    }
    return (
      <div className="JokesList">
        <header>
          <h1>Dad Jokes</h1>
        </header>
        <aside>
          <button type="button" onClick={this.handleClick}>
            Get new jokes
          </button>
        </aside>
        <main>
          {this.state.jokes.map((joke) => (
            <Joke
              key={joke.id}
              text={joke.text}
              votes={joke.votes}
              upvote={() => this.handleVote(joke.id, 1)}
              downvote={() => this.handleVote(joke.id, -1)}
            />
          ))}
        </main>
      </div>
    );
  }
}

export default JokesList;
