import React from "react";
import ReactDOM from "react-dom";
import './styles/global.scss';
import AppRouter from "./AppRouter";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  rootElement
);
