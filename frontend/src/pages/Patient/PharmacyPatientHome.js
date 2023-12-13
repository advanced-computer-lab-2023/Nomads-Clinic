import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../../components/Patient/Cart';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';

const PharmacyPatientHome = () => {
  const { user } = useAuthContext();
  const patientId = user ? user.id : null;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const fetchItems = async (patientId) => {
    try {
      const response = await axios.get(`/api/patients/${patientId}/cart`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (response.status === 200) {
        setItems(response.data);
        localStorage.setItem('cart', JSON.stringify(response.data));
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchItems = async (patientId) => {
      try {
        const response = await axios.get(`/api/patients/${patientId}/cart`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (response.status === 200) {
          setItems(response.data);
          localStorage.setItem('cart', JSON.stringify(response.data));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };

    if (patientId) {
      fetchItems(patientId);
    }
  }, [patientId, user]);

  const toggleCart = () => {
    setShowCart(!showCart);
  };
const addToCart = async (medicineId, quantity, price) => {
  try {
    

   
      // If the medicine is already in the cart, update the quantity in the backend
      const response = await axios.put(`/api/patients/${user.id}/cart/${medicineId}`, null, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.status === 201 || response.status === 200) {
        fetchItems(patientId);
      } else {
        console.error('Failed to update quantity in the cart.');
      }
    
  } catch (error) {
    console.error('Error adding/updating item in the cart:', error);
  }
};

  const removeFromCart = async (medicineId) => {
    try {
      const response = await axios.put(`/api/patients/${user.id}/cart/${medicineId}/decrease`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.status === 200 ||response.status === 201) {
        // Handle the successful removal from the cart
        fetchItems(patientId);

        

      } else {
        console.error('Failed to remove item from cart.');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  const getCartItemQuantity = (medicineId) => {
    
    
    const cartItem = cart.find(item => item.medicine._id == medicineId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="admin-home" style={{ display: 'flex' }}>
      <div className="home-button">
        <Link to="/patient-view-medicine">
          <button>View Medicine</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/patient-change-password">
          <button>Change Password</button>
        </Link>
      </div>
      <div className="home-button">
        <Link to="/orders">
          <button>My orders</button>
        </Link>
      </div>
      <div className="home-button">
        <button onClick={toggleCart}>Open Cart</button>
        {showCart && (
          <div className="cart-overlay">
            <div className="cart-modal">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <Cart cartItems={items} addToCart={addToCart} removeFromCart={removeFromCart} />
                  <button onClick={toggleCart} style={{ marginTop: '10px' }}>Close Cart</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyPatientHome;
