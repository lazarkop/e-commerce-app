import { createSlice, createSelector } from '@reduxjs/toolkit';
//import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';


const initialState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;

export const selectCategoriesReducer = (state) => {
return state.category
}
 
 export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => {
    return categoriesSlice.categories}
 )

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
    
  }, {})})
  

export default categorySlice.reducer;