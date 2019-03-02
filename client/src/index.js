import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import "./css/styles.css";
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
  faTruck,
  faCheck,
  faTimes,
  faFrown,
  faSmile
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faAngleDown,
  faAngleUp,
  faThLarge,
  faTh,
  faPlusCircle,
  faTruck,
  faCheck,
  faTimes,
  faFrown,
  faSmile
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
