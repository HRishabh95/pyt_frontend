import { Outlet, Link } from "react-router-dom";
import {Component} from "react";
import React from "react";
import {Button} from "react-native";
import {Collapse} from "react-collapse/lib/Collapse";



export default class App extends Component {

    state = {
        searchValue: "",
        checked: false,
    };


  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  render(){
      return (
        <div>
          <h1>Welcome to the Pyterrier Test Search engine</h1>
            <input
              name="text"
              type="text"
              placeholder="Search"
              onChange={event => this.handleOnChange(event)}
              value={this.state.searchValue}
            />

            <label>
            <input type="checkbox"
            defaultChecked={this.state.checked}
            onChange={() => this.setState({checked:!this.state.checked})}
            />
            Misinformation
            </label>
          <nav
            style={{
              borderBottom: "solid 1px",
              paddingBottom: "1rem"
            }}
          >
            {/*<Link to="/invoices">Invoices</Link> |{" "}*/}
            <Link style={{ display: "block", margin: "1rem 0" }}
                  to={`/search/${this.state.searchValue}`}
                  key={this.state.searchValue}>Search</Link>
          </nav>
          <Outlet />
        </div>
      );

  }

}
