import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, addToCart, removeFromCart }) => {
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
              <li className="quantity-buttons" key={index}>
                {item.medicine.name} - Price: {item.price} - Quantity: {item.quantity}
                <button className="add-to-cart-button"  onClick={() => addToCart(item.medicine._id, 1, item.price)}>
                  Add One
                </button>
                <button  className="remove-from-cart-button" onClick={() => removeFromCart(item.medicine._id)}>
                  Remove One
                </button>
              </li>
            ))}
          </ul>
          <p>Total Price: {totalPrice}</p>
          <Link to="/checkout">
            <button>Checkout</button>
          </Link>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
