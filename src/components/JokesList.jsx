import axios from "axios";
import Joke from "./Joke";
import React, { Component } from "react";

class JokesList extends Component {
  static defaultProps = {
    jokesNum: 10,
  };

  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }

  async componentDidMount() {
    // create array of jokes
    let jokes = [];

    // get 10 jokes
    while (jokes.length < this.props.jokesNum) {
      // Load jokes
      let response = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });

      jokes.push({text: response.data.joke, votes: 0});
    }

    // console.log(jokes);
    this.setState({ jokes: jokes });
  }

  render() {
    return (
      <div className="JokesList">
        <h1>Dad Jokes</h1>
        {this.state.jokes.map((joke) => (
          <Joke text={joke.text} votes={joke.votes} />
        ))}
      </div>
    );
  }
}

export default JokesList;
