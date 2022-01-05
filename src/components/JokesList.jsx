import axios from "axios";
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

      jokes.push(response.data.joke);
    }

    // console.log(jokes);
    this.setState({ jokes: jokes });
  }

  render() {
    return <h1>Jokes List</h1>;
  }
}

export default JokesList;
