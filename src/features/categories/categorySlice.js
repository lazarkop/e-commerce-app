import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';


const initialState = {
  loading: false,
  categories: [],
  error: ''
};

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
  const response = await getCategoriesAndDocuments('categories')
  return response
})

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
      }
    },
  extraReducers: (builder) => {
      builder.addCase(fetchCategories.pending, (state) => {
        state.loading = true
      })
      builder.addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
        state.error = ''
      })
      builder.addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.categories = []
        state.error = action.error.message
      })
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

  export const selectIsLoading = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => categoriesSlice.loading
  );
  

export default categorySlice.reducer;