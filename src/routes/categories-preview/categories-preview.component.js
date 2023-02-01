import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {selectCategoriesMap} from '../../features/categories/categorySlice'

import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
 const categoriesMap = useSelector(selectCategoriesMap)

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;