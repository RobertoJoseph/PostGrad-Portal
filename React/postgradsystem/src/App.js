import "./App.css";
import Main from "./components/MainComponent";

import { BrowserRouter } from "react-router-dom";
import { Component } from "react";
// import { response } from "../../../api/app";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
    };
  }

  callAPi() {
    fetch("http://localhost:9000/testApi")
      .then((response) => response.text())
      .then((response) => {
        this.setState({
          apiResponse: response,
        });
      });
  }
  componentDidMount(){
    this.callAPi();

  }

  render() {
    return (
      <div>
        <h4>HEY</h4>
        <p>{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;
