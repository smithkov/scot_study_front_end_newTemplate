import "react-app-polyfill/stable";
import "core-js";
import "./admin/polyfill";
import "semantic-ui-css/semantic.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { icons } from "./admin/assets/icons";

import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
React.icons = icons;
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
