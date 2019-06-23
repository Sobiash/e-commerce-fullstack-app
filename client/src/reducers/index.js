import { combineReducers } from "redux";
import AuthReducer from "./auth_reducer";
import UserReducer from "./user_reducer";
import ProductReducer from "./products_reducer";
import ErrorReducer from "./error_reducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  products: ProductReducer,
  errors: ErrorReducer
});

export default rootReducer;
