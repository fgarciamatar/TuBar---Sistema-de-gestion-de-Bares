import {configureStore} from '@reduxjs/toolkit';

import loginReducer from '../reducers/reducer';
import reducers from "./reducer"
<<<<<<< HEAD
=======
import tableReducer from '../reducers/tableReducer';
>>>>>>> develop

export const store = configureStore({
  reducer: {
    logins: loginReducer,
<<<<<<< HEAD
    reducers: reducers
=======
    reducers: reducers,
    table: tableReducer
>>>>>>> develop
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;