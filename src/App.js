import { Outlet, Link } from "react-router-dom";
import React from "react";

export default function App() {
  return (
    <div>
        <h1>Welcome to the Pyterrier Test Search engine</h1>
        <input
          name="text"
          type="text"
          placeholder="Search"
          // onChange={event => this.handleOnChange(event)}
          // value={searchValue}
        />
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </div>
  );
}