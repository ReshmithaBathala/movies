import React, { Component } from "react";
import "./index.css";

class MovieCard extends Component {
  state = {
    dogImage: "",
  };

  componentDidMount() {
    this.fetchDogImage();
  }

  fetchDogImage = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    this.setState({ dogImage: data.message });
  };

  render() {
    const { movie } = this.props;
    const { dogImage } = this.state;
    return (
      <li className="movie-card">
        <img src={dogImage} alt="Random Dog" className="movie-image" />
        <h2 className="title">{movie.title}</h2>
        <p className="author">
          {movie.authorName ? movie.authorName.join(", ") : "Unknown Author"}
        </p>
      </li>
    );
  }
}

export default MovieCard;
