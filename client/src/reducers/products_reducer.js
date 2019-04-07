import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS,
  GET_DRESSES,
  GET_COLORS,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from "../actions/types";

const initialState = { productDetail: {} };

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload };
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };
    case GET_PRODUCTS:
      return {
        ...state,
        articles: action.payload.articles,
        size: action.payload.size
      };
    case GET_DRESSES:
      return {
        ...state,
        dresses: action.payload
      };
    case GET_COLORS:
      return {
        ...state,
        colors: action.payload
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload
      };
    case CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload
      };
    default:
      return state;
  }
};

export default ProductReducer;
