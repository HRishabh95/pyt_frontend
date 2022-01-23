import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Search from "./Search";
import Docs from "./docs";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
   <Routes>
  <Route path="/" element={<App />}>
    <Route path="search/:searchValue" element={<Search />}>
      <Route path=":docno" element={<Docs />}/>
    </Route>
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>
  </BrowserRouter>,
  rootElement
);