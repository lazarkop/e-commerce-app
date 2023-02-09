import {
  selectCartCount,
  selectIsCartOpen,
} from '../../features/cart/cartSlice';
import { setIsCartOpen } from '../../features/cart/cartSlice';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { CartIconContainer, ItemCount } from './cart-icon.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const CartIcon = () => {
  const dispatch = useAppDispatch();
  const isCartOpen = useAppSelector(selectIsCartOpen);
  const cartCount = useAppSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;