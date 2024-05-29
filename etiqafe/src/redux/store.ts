// store.ts

import { configureStore } from '@reduxjs/toolkit';
import ToastMiddleware from '../middleware/ToastMiddleware';
import authReducer from './slices/auth-slice';

export const store = configureStore({
  reducer: {
     authReducer,
},
//middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

