import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducers";
import ReduxThunk from "redux-thunk";

const middlewares = [ReduxThunk];

export const testStore = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};
