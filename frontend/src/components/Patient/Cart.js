import React from 'react';
import { json, Link } from 'react-router-dom';

const Cart = ({ cartItems }) => {
  cartItems = cartItems.cartItems;

  // Calculate the total price of the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Cart :</h2>
      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.medicine.name} - Price: {item.price} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
          <p>Total Price: {totalPrice}</p>
          <Link to="/checkout">
          <button >Checkout</button>
          </Link>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;

