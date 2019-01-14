import { combineReducers } from "redux";
import UserReducer from "./user_reducer";
import ProductReducer from "./products_reducer";

const rootReducer = combineReducers({
  user: UserReducer,
  product: ProductReducer
});

export default rootReducer;
