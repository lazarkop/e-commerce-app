import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import categoriesReducer from '../features/categories/categorySlice'
import cartReducer from '../features/cart/cartSlice'


import { combineReducers } from 'redux';

const reducers = {
    user: userReducer,
    category: categoriesReducer,
    cart: cartReducer
};

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

