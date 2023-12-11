import React, { useEffect, useState } from 'react';
import { json, Link } from 'react-router-dom';
import Cart from '../../components/Patient/Cart';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios'; // Import Axios

const PharmacyPatientHome = () => {
  const { user } = useAuthContext();
  const patientId = user ? user.id : null;
  const [items, setItems] = useState([]);
  
  const [loading, setLoading] = useState(true);

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
          localStorage.setItem('cart', JSON.stringify(response.data))
          
          
         console.log(response.data.cartItems)
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
      <div className="cart">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Cart cartItems={items} />
        )}
      </div>
    </div>
  );
};

export default PharmacyPatientHome;
