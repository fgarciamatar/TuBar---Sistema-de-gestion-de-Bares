import {configureStore} from '@reduxjs/toolkit';

import loginReducer from '../reducers/reducer';
import reducers from "./reducer"

export const store = configureStore({
  reducer: {
    logins: loginReducer,
    reducers: reducers
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;