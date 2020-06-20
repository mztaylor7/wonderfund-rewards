/* Import Modules */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducers/reducer';

/* Configure the Redux Store */
export default () =>
  configureStore({
    reducer,
    middleware: [...getDefaultMiddleware()],
  });
