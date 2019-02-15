import { combineReducers } from "redux";
import UserReducer from "./user_reducer";
import ProductReducer from "./products_reducer";
import SiteReducer from "./site_reducer";

const rootReducer = combineReducers({
  user: UserReducer,
  products: ProductReducer,
  site: SiteReducer
});

export default rootReducer;
