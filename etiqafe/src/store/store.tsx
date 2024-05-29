// store.ts

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/productSlice';
import ToastMiddleware from '../middleware/ToastMiddleware';

const store = configureStore({
  reducer: {
    counter: counterReducer,
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)
});

export default store;
