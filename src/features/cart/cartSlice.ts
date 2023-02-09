import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { CategoryItem } from '../../utils/firebase/firebase.utils';

export type CartItem = CategoryItem & {
  quantity: number;
}

type CartState = {
  cartItems: CartItem[];
  isCartOpen: boolean;
}

const initialState: CartState = {
  cartItems: [],
  isCartOpen: false,
};

export type AddItemToCart = {
  cartItems: CartItem[];
  product: CategoryItem;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, {payload}: PayloadAction<AddItemToCart>) => {
      const existingCartItem = payload.cartItems.find(
        (cartItem) => cartItem.id === payload.product.id
      );
      if (existingCartItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem.id === payload.product.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        state.cartItems = [
          ...state.cartItems,
          { ...payload.product, quantity: 1 },
        ];
      }
    },

    removeItemFromCart: (state, {payload}: PayloadAction<CartItem>) => {
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.id === payload.id
      );
      if (existingCartItem && existingCartItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== payload.id
        );
      }
      state.cartItems = state.cartItems.map((cartItem) =>
        cartItem.id === payload.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    },

    clearItemFromCart: (state, {payload}: PayloadAction<CartItem>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== payload.id
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },

    setIsCartOpen: (state, {payload}: PayloadAction<boolean>) => {
      state.isCartOpen = payload;
    },
  },
});


const selectCartReducer = (state: RootState) => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  setIsCartOpen,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;