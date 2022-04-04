import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import allReducers from "./reducers/combineReducers";
import { Provider } from "react-redux";

// const store = createStore(
//   allReducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   compose(applyMiddleware(thunk, logger))
// );
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  allReducers,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk, logger))
);

ReactDOM.render(
  
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
