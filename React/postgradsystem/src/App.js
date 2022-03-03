import "./App.css";
import Main from "./components/MainComponent";

import { BrowserRouter } from "react-router-dom";
import { Component } from "react";
import Register from "./components/RegisterComponent";
// import { response } from "../../../api/app";
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

<<<<<<< HEAD
function App() {
  return (
    <BrowserRouter>
     <Main></Main>
    </BrowserRouter>
  );
=======
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
  componentDidMount() {
    this.callAPi();

  }

  render() {
    return (
      // <div>
      //   <h4>HEY</h4>
      //   <p>{this.state.apiResponse}</p>
      // </div>
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
>>>>>>> 70782a98407ca8fa1d7e99b73b0571018595e598
}

export default App;
