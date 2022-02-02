import { Outlet, Link } from "react-router-dom";
import {Component} from "react";
import React from "react";
import {Button} from "react-native";
import {Collapse} from "react-collapse/lib/Collapse";
import './App.css';


class App extends Component {

    state = {
        searchValue: "",
        checked_mis: false,
        checked_la:false
    };

    constructor(props){
            super(props);
            this.state = {
                    open: false
                }
                this.togglePanel = this.togglePanel.bind(this);
        };

    togglePanel(e){
        this.setState({open: !this.state.open})
        };

    handleOnChange = event => {
        this.setState({ searchValue: event.target.value });
    };



  render(){
      return (
        <div >
          <h1 style={{text_align:"center"}}>Welcome to the Pyterrier Test Search engine</h1>
            <input style={{width: "50%", margin:'auto'}}
              name="text"
              type="text"
              placeholder="Search"
              onChange={event => this.handleOnChange(event)}
              value={this.state.searchValue}
            />

            <div className='advance_container' style={{flexDirection:'row'}}>
             <button onClick={(e)=> this.togglePanel(e)} className='header'>
                 Advance options
             </button>
                {this.state.open? (
                    <div style={{display: "inline"}}>
                            <label className='checkbox-label'>
                            <input className='checkboxes' type="checkbox"  defaultChecked={this.state.checked_mis}
                            onChange={() => this.setState({checked_mis:!this.state.checked_mis})}
                            />
                            Misinformation
                            </label>

                        {this.state.checked_mis? ( <label className='checkbox-label'>
                            <input className='checkboxes' type="checkbox"  defaultChecked={this.state.checked_la}
                            onChange={() => this.setState({checked_la:!this.state.checked_la})}
                            />
                            Linear Aggregation
                            </label>):null}
                    </div>):null} </div>
          <nav
            style={{
              borderBottom: "solid 1px",
              paddingBottom: "1rem",
            }}
          >
            {/*<Link to="/invoices">Invoices</Link> |{" "}*/}
            <Link style={{ display: "block", margin_left: "50px 50px", text_align:"center" }}
                  to={`/search/${this.state.searchValue}`}
                  key={this.state.searchValue}
            state={{misinformation:this.state.checked_mis, agg:this.state.checked_la}}><button>Search</button></Link>
          </nav>
          <Outlet />
        </div>
      );

  }

}

export default App;
