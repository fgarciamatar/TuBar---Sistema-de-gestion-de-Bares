//reducer.js
import {GET_PROFILES, } from './types';

const initialState = {
  profiles: [],
  
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
      };


    default:
      return {...state};
  }
};

export default rootReducer;
