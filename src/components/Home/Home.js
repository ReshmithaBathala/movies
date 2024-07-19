import React, { Component } from "react";
import { TailSpin } from "react-loader-spinner";
import { FaSearch } from "react-icons/fa";
import MovieCard from "../MovieCard/MovieCard";
import "./index.css";

class Home extends Component {
  state = {
    query: "",
    movies: [],
    isLoading: false,
    sortOption: "none",
  };

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSortChange = (event) => {
    const sortOption = event.target.value;
    this.setState((prevState) => ({
      sortOption,
      movies: this.sortMovies(prevState.movies, sortOption),
    }));
  };

  sortMovies = (movies, sortOption) => {
    if (sortOption === "asc") {
      return movies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "desc") {
      return movies.sort((a, b) => b.title.localeCompare(a.title));
    }
    return movies;
  };

  handleSearch = async () => {
    this.setState({ isLoading: true });
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${this.state.query}`
    );
    const data = await response.json();
    const requiredData = data.docs.slice(0, 10);
    const convertedData = requiredData.map((each) => ({
      title: each.title,
      auhtorName: each.author_name,
      ratings: each.ratings_count,
    }));
    this.setState({
      movies: convertedData,
      isLoading: false,
    });
  };

  handleKeyPress = (event) => {
    //// explicitly triggering the enter instead of clicking search button
    if (event.key === "Enter") {
      this.handleSearch();
    }
  };

  loadingView = () => (
    <div className="loader-container" testid="loader">
      <TailSpin type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  );

  render() {
    const { sortOption, isLoading, movies } = this.state;
    return (
      <div className="home-container">
        <h1 className="search-movie">Search Movie</h1>
        <div className="movie-sort-container">
          <div>
            <input
              type="text"
              value={this.state.query}
              onChange={this.handleInputChange}
              onKeyDown={this.handleKeyPress}
              placeholder="Enter movie name :)"
              className="input-text"
            />
            <button onClick={this.handleSearch} className="search-button">
              <FaSearch className="search-icon" />
            </button>
          </div>

          {/* Sort based on title in ascending or descenging order */}
          <div className="options-container">
            <label htmlFor="sort" className="title-sort">
              Sort by Title:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={this.handleSortChange}
              className="sort-container"
            >
              <option value="none" className="option-text">
                None
              </option>
              <option value="asc" className="option-text">
                Ascending
              </option>
              <option value="desc" className="option-text">
                Descending
              </option>
            </select>
          </div>
        </div>

        {isLoading ? (
          this.loadingView()
        ) : (
          <ul className="movie-list-container">
            {movies.map((movie) => (
              <MovieCard key={movie.key} movie={movie} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Home;
