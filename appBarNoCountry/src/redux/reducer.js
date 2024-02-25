//reducer.js
import {GET_PROFILES, GET_TABLES, } from './types';

const initialState = {
  profiles: [],
  tables: [],
  
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


    default:
      return {...state};
  }
};

export default rootReducer;
