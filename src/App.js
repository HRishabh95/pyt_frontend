import logo from './logo.svg';
import './App.css';

import {Routes, Route, Link} from "react-router-dom";
// import './index.css';
import reportWebVitals from './reportWebVitals';
import Search from './Search';

function App() {
  return (
    <div className="wrapper">
      <h1>Marine Mammals</h1>
      <li><Link to='/search'>Search Here</Link></li>
        <Routes>
          <Route path='/search' element={<Search />} />
          <Route path="/results" element={<div>Print results</div>} />
        </Routes>
    </div>
  );
}


export default App;
