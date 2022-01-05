import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
  setColor() {
    if (this.props.votes >= 15) {
      return "#4CAF50";
    } else if (this.props.votes >= 12) {
      return "#8BC34A";
    } else if (this.props.votes >= 9) {
      return "#FFEB3B";
    } else if (this.props.votes >= 6) {
      return "#CDDC39";
    } else if (this.props.votes >= 3) {
      return "#FFC107";
    } else if (this.props.votes >= 0) {
      return "#FF9800";
    } else {
      return "#f44336";
    }
  }

  setEmoji() {
    if (this.props.votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.votes >= 12) {
      return "em em-laughing";
    } else if (this.props.votes >= 9) {
      return "em em-smiley";
    } else if (this.props.votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (this.props.votes >= 3) {
      return "em em-neutral_face";
    } else if (this.props.votes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }

  render() {
    return (
      <div className="Joke">
        <div className="Joke-actions">
          <p className="Joke-votes" style={{ borderColor: this.setColor() }}>
            {this.props.votes}
          </p>
          <button type="button" onClick={this.props.upvote}>
            <i className="fas fa-arrow-up"></i>Upvote
          </button>
          <button type="button" onClick={this.props.downvote}>
            <i className="fas fa-arrow-down"></i>Downvote
          </button>
        </div>
        <p className="Joke-text">{this.props.text}</p>
        <div className="Joke-emoji">
          <i className={this.setEmoji()}></i>
        </div>
      </div>
    );
  }
}

export default Joke;
