import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
} from '../../features/cart/cartSlice';
import { selectCartItems } from '../../features/cart/cartSlice';

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles';

import { CartItem } from '../../features/cart/cartSlice';

type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ( {cartItem} ) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const product = cartItem;
  
  const clearItemHandler = () => dispatch(clearItemFromCart( cartItem ));

  const addItemHandler = () => dispatch(addItemToCart( {cartItems, product} ));

  const removeItemHandler = () => dispatch(removeItemFromCart( cartItem ));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;