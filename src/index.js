import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {BrowserRouter, Link} from "react-router-dom";
// import './index.css';
import App from "./App";
import {Routes, Route} from "react-router-dom";
import Search from './Search';
import Results from "./results";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/search' element={<Search />} />
          <Route path="/results" element={<Results />} >
              {/*<Route path=':searchValue' element={<Result />} />*/}
          </Route>
        </Routes>
  </BrowserRouter>,
  rootElement
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
