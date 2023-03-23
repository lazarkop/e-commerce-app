import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { selectCartItems } from '../../features/cart/cartSlice';
import { addItemToCart } from '../../features/cart/cartSlice';
import { CategoryItem } from '../../utils/firebase/firebase.utils';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from './product-card.styles';

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const addProductToCart = () => dispatch(addItemToCart( {cartItems, product} ));

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;

