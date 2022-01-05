import React, { Component } from "react";

class Joke extends Component {
  render() {
    return (
      <div>
        <div className="Joke-actions">
          <p>Votes: {this.props.votes}</p>
          <button type="button" onClick={this.props.upvote}><i class="fas fa-arrow-up"></i>Upvote</button>
          <button type="button" onClick={this.props.downvote}><i class="fas fa-arrow-down"></i>Downvote</button>
        </div>
        <p className="Joke-text">
          {this.props.text}
        </p>
        <i class="em em-rolling_on_the_floor_laughing" aria-role="presentation" aria-label="ROLLING ON THE FLOOR LAUGHING"></i>
      </div>
    );
  }
}

export default Joke;
