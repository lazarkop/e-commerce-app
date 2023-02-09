import { CartItemContainer, ItemDetails } from "./cart-item.styles";
import type { CartItem as TCartItem } from "../../features/cart/cartSlice";
import { FC } from 'react';

type CartItemProps = {
  cartItem: TCartItem;
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} X ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;