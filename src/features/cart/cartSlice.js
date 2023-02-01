import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, {payload}) => {
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

    removeItemFromCart: (state, {payload}) => {
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.id === payload.product.id
      );
      if (existingCartItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== payload.product.id
        );
      }
      state.cartItems = state.cartItems.map((cartItem) =>
        cartItem.id === payload.product.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    },

    clearItemFromCart: (state, {payload}) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== payload.product.id
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },

    setIsCartOpen: (state, {payload}) => {
      state.isCartOpen = payload;
    },
  },
});

const selectCartReducer = (state) => state.cart;

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