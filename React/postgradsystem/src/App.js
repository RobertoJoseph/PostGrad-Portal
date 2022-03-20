import "./App.css";
import Main from "./components/MainComponent";

import { BrowserRouter as Router } from "react-router-dom";
import { Component } from "react";
import Register from "./components/RegisterComponent";

// import { response } from "../../../api/app";

function App() {
  return (
    <Router>
      <Main></Main>
    </Router>
  );
}

export default App;