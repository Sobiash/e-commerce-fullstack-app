import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS,
  GET_DRESSES,
  GET_CATEGORIES,
  CLEAR_CATEGORIES,
  GET_COLORS,
  GENDER_CATEGORIES,
  DRESS_CATEGORIES,
  ADD_PRODUCT,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL,
  DELETE_PRODUCT,
  EDIT_PRODUCT
} from "../actions/types";

const initialState = { articles: [], product: {} };

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        articles: [action.payload, ...state.articles]
      };
    case GET_PRODUCTS_BY_SELL:
      return {
        ...state,
        bySell: action.payload
      };
    case GET_PRODUCTS_BY_ARRIVAL:
      return {
        ...state,
        byArrival: action.payload
      };
    case GET_PRODUCTS:
      return {
        ...state,
        articles: action.payload.articles,
        size: action.payload.size
      };
    case GENDER_CATEGORIES:
      return {
        ...state,
        genderCategories: action.payload
      };
    case DRESS_CATEGORIES:
      return {
        ...state,
        dressCategories: action.payload
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
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case CLEAR_CATEGORIES:
      return {
        ...state,
        categories: action.payload
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
    case DELETE_PRODUCT:
      return {
        ...state,
        articles: state.articles.filter(
          article => article._id !== action.payload
        )
      };
    case EDIT_PRODUCT:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default ProductReducer;
