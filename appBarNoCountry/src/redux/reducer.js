//reducer.js
import {
  GET_PROFILES,
  GET_TABLES,
  GET_CATEGORIES,
  GET_PRODUCTS,
  SELECTED_PRODUCTS,
  SHOW_LOADER,
  HIDE_LOADER,
} from './types';

const initialState = {
  profiles: [],
  tables: [],
  categories: [],
  products: [],
  selectedProducts: {},
  isLoading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
      };
    case GET_TABLES:
      return {
        ...state,
        tables: action.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case SELECTED_PRODUCTS:
      return {
        ...state,
        selectedProducts: action.payload,
      };
    case SHOW_LOADER: // Actualiza el estado del loader cuando se muestra
      return {
        ...state,
        isLoading: true,
      };
    case HIDE_LOADER: // Actualiza el estado del loader cuando se oculta
      return {
        ...state,
        isLoading: false,
      };
    default:
      return {...state};
  }
};

export default rootReducer;
