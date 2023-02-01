import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser; // Moving the user selector here rather than separate file - can also
//easily put this in the component file that uses this piece of state

export default userSlice.reducer;