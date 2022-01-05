import React, { Component } from "react";

class Joke extends Component {
  render() {
    return (
      <div>
        <div className="Joke-actions">
          <p>Votes: {this.props.votes}</p>
          <button type="button">Upvote</button>
          <button type="button">Downvote</button>
        </div>
        <p className="Joke-text">
          {this.props.text}
        </p>
      </div>
    );
  }
}

export default Joke;
