import './checkout.styles.scss';
import { CartContext } from "../../context/cart.context";
import { useState, useContext } from "react";

const CheckoutPage = () => {
  const { cartItems } = useContext(CartContext);
  const [localCartItems, setLocalCartItems] = useState(cartItems);

  const removeItemFromCart = (item) => {
    setLocalCartItems((prevCartItems) =>
      prevCartItems.filter((cartItem) => cartItem !== item)
    );
  };

  const increaseQuantity = (item) => {
    setLocalCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decreaseQuantity = (item) => {
    setLocalCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem.id === item.id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  return (
    <div>
      {localCartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="item-image">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="item-details">
            <div className="item-name">{item.name}</div>
            <div className="item-price">${item.price}</div>
            <div className="item-quantity">
              <div className="quantity-arrows">
                <button onClick={() => decreaseQuantity(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item)}>+</button>
              </div>
              <button onClick={() => removeItemFromCart(item)}>Remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CheckoutPage;
