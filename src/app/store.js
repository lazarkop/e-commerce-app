import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from '../features/user/userSlice';
import categoriesReducer from '../features/categories/categorySlice'
import cartReducer from '../features/cart/cartSlice'
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from 'redux';

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: []
};


const reducers = combineReducers({
    user: userReducer,
    category: categoriesReducer,
    cart: cartReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger],
});



