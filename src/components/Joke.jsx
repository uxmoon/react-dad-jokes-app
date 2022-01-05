import React, { Component } from "react";

class Joke extends Component {
  render() {
    return (
      <p className="JokesList-item">
        {this.props.text} - {this.props.votes}
      </p>
    );
  }
}

export default Joke;
