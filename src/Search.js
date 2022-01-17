import React, { Component } from "react";
import "./Search.css";

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
          <div id="meals-container">
            {this.state.docs.map((docs, index) => (
              <div class="single-meal" key={index}>
                <table>
                  <tbody>
                    <tr>
                      <td>{docs.docno}</td>
                      <td>{docs.rank}</td>
                      <td>{docs.score}</td>
                      <td>{docs.text}</td>
                      <td>
                          <button onClick={() => this.linkedninHandle(docs.text)}>See Text</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
