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
  reducer: reducers
});



