import { Fragment } from 'react';
import {selectCategoriesMap, selectIsLoading } from '../../features/categories/categorySlice'

import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';
import { useAppSelector } from '../../app/hooks';

const CategoriesPreview = () => {
 const categoriesMap = useAppSelector(selectCategoriesMap);
 const isLoading = useAppSelector(selectIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;