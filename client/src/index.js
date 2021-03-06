import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./css/main.css";
import "./css/util.css";
import "./css/styles.css";
import "./css/new.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faAngleUp,
  faTh,
  faThLarge,
  faPlusCircle,
  faTimes,
  faPencilAlt,
  faTrashAlt,
  faSave,
  faShoppingBag
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faAngleDown,
  faAngleUp,
  faThLarge,
  faTh,
  faPlusCircle,
  faTimes,
  faPencilAlt,
  faTrashAlt,
  faSave,
  faShoppingBag
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
