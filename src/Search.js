import React, { Component } from "react";
import "./Search.css";
import PostShort from "./components/PostShort";

class Search extends Component {
  state = {
    searchValue: "",
    meals: []
  };


  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };

  linkedninHandle = (contents) => {
    alert(`${contents}`);
  };

  makeApiCall = searchInput => {
    var searchUrl = `http://127.0.0.1:5000/search?query=${searchInput}`;
    fetch(searchUrl)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.setState({ docs: jsonData });
      });
  };

  render() {
    return (
      <div id="main">
        <h1>Welcome to the Pyterrier Test Search engine</h1>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={event => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Search</button>
        <h1>Results for the Query</h1>
        {this.state.docs ? (
          <div id="results-container">
            {this.state.docs.map((docs, index) => (
              <div class="single-docs" key={index}>
                <PostShort key={docs.docno} title={docs.text} score={docs.score} />
              </div>
            ))}
          </div>
        ) : (
          <p>Try searching for a meal</p>
        )}
      </div>
    );
  }
}

export default Search;
