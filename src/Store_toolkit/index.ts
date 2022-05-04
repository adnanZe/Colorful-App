import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { boxReducer } from './StoreReducer';

export const store = configureStore({
  reducer: {
    box: boxReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
