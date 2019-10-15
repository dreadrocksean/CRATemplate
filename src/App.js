import React, { useContext } from "react";
import { __RouterContext } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import "./App.css";

function App() {
  // console.log("__RouterContext: ", __RouterContext);
  // const context = useContext(__RouterContext);
  // console.log("context: ", context);
  // const pathname = context.location.pathname;
  // const crumbs = pathname.split("/").splice(1);
  return (
    <Router>
      <Header />
      <Main />
    </Router>
  );
}

export default App;
