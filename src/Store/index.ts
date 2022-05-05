import { configureStore } from '@reduxjs/toolkit';
import { boxReducer } from './Store';

export const store = configureStore({
  reducer: {
    box: boxReducer,
  },
});
