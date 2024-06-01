// store.ts

import { configureStore } from '@reduxjs/toolkit';
import ToastMiddleware from '../middleware/ToastMiddleware';
import authReducer from './slices/auth-slice';
import userReducer from './slices/user-slice';
import { UseSelector, TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
     authReducer,
     user : userReducer,
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;

