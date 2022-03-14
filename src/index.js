import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  rootElement
);
