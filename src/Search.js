import React, { Component } from "react";
import "./Search.css";
import {Link, useNavigate} from "react-router-dom";


class Search extends Component {
  state = {
    searchValue: "",
    meals: []
  };



  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    // this.makeApiCall(this.state.searchValue);
  useNavigate("/results",{ query: this.state.searchValue})
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
        <Link to={`/results/${this.state.searchValue}`} key={this.state.searchValue}>
        {this.state.searchValue}
        </Link>

      </div>
    );
  }
}

export default Search;
