import "./App.css";
import Main from "./components/MainComponent";

import { BrowserRouter } from "react-router-dom";
import { Component } from "react";
import Register from "./components/RegisterComponent";
// import { response } from "../../../api/app";

function App() {
  return (
    <BrowserRouter>
     <Main></Main>
    </BrowserRouter>
  );
}

export default App;
