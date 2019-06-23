import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import promiseMiddleware from "redux-promise";
import rootReducer from "./reducers";
import logger from "redux-logger";

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(promiseMiddleware, ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
