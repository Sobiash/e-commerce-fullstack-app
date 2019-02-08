import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SELL,
  GET_DRESSES,
  GET_COLORS,
  GET_PRODUCTS,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  ADD_DRESS,
  ADD_COLOR,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from "../actions/types";

const initialState = {};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload };
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };
    case GET_DRESSES:
      return { ...state, dresses: action.payload };
    case GET_COLORS:
      return { ...state, colors: action.payload };
    case GET_PRODUCTS:
      return {
        ...state,
        articles: action.payload.articles,
        size: action.payload.size
      };
    case ADD_PRODUCT:
      return { ...state, addProduct: action.payload };
    case CLEAR_PRODUCT:
      return { ...state, addProduct: action.payload };
    case ADD_DRESS:
      return {
        ...state,
        addDress: action.payload.success,
        dresses: action.payload.dresses
      };
    case ADD_COLOR:
      return {
        ...state,
        addColor: action.payload.success,
        colors: action.payload.colors
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
