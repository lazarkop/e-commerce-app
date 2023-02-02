import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCategories } from '../../features/categories/categorySlice';
import { Routes, Route } from 'react-router-dom';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { fetchCategories } from '../../features/categories/categorySlice';


const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
   
      <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=":category" element={<Category />} />
      </Routes>
    
  );
};

export default Shop;