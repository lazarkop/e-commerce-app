import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../utils/firebase/firebase.utils';
import { RootState } from '../../app/store';

type UserState = {
  currentUser: UserData | null; 
} 

const initialState: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserData | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;


export const selectCurrentUser = (state: RootState) => state.user.currentUser; 

export default userSlice.reducer;

