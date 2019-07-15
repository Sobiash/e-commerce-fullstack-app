import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS,
  GET_DRESSES,
  GET_CATEGORIES,
  CLEAR_CATEGORIES,
  GET_COLORS,
  GET_SIZES,
  ADD_PRODUCT,
  GET_PRODUCT_DETAIL,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  CATEGORY_NAME,
  DRESS_NAME
} from "../actions/types";

const initialState = { articles: [], product: {}, allProducts: [] };

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
    case GET_SIZES:
      return {
        ...state,
        sizes: action.payload
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
    // case CLEAR_PRODUCT_DETAIL:
    //   return {
    //     ...state,
    //     productDetail: action.payload
    //   };
    case DELETE_PRODUCT:
      return {
        ...state,
        articles: state.articles.filter(
          article => article._id !== action.payload
        )
      };
    case DRESS_NAME:
      return {
        ...state,
        dressName: action.payload
      };
    case CATEGORY_NAME:
      return {
        ...state,
        categoryName: action.payload
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
