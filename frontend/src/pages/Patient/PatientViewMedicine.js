import React, { useEffect, useState } from 'react';
import MedicineDetails from '../../components/Patient/MedicineDetails';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';

const PatientViewMedicine = () => {
  const [medicine, setMedicine] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUse, setSelectedUse] = useState('');
  const { user } = useAuthContext();
  const patientId = user ? user.id : null;
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchItems = async (patientId) => {
      try {
        console.log('Fetching cart items for patientId:', patientId);
        const response = await axios.get(`/api/patients/${patientId}/cart`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
  
        console.log('Response:', response); // Log the entire response object
  
        if (response.status === 200 || response.status === 201) {
          setCart(response.data.cartItems);
          localStorage.setItem('cart', JSON.stringify(response.data));
          console.log('Cart items:', response.data.cartItems);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
  
    console.log('Current patientId:', patientId);
    if (patientId) {
      fetchItems(patientId);
    }
  }, [patientId]);
  
  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await fetch('/api/medicine', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (response.ok) {
          const json = await response.json();
          setMedicine(json);
        }
      } catch (error) {
        console.error('Error fetching medicine:', error);
      }
    };

    if (user) {
      fetchMedicine();
    }
  }, [user]);

  const uniqueUses = [...new Set(medicine.map((med) => med.use))];

  const filteredMedicines = medicine.filter((med) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      (med.use === selectedUse || selectedUse === '') &&
      med.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });
  const addToCart = async (medicineId, quantity, price) => {
  
    


    if (localStorage.getItem('cart')){
      const cartItems = localStorage.getItem('cart');
      const cartItemsObject = JSON.parse(cartItems)
      setCart(cartItemsObject.cartItems)
      
      try {
        // Check if the medicine is already in the cart
        const existingItemIndex = cart.findIndex((item) => item.medicine._id == medicineId);
        
        
        if (existingItemIndex !== -1) {
          // If the medicine is already in the cart, update the quantity in the backend
          const response = await axios.put(`/api/patients/${user.id}/cart/${medicineId}`, {
           
            headers: {
              
              'Authorization': `Bearer ${user.token}`
            }
            
          });
    
          if (response.status===201 || response.status===200) {
            // Handle the successful update of the quantity
            console.log('Quantity updated in the cart.');
            // Update the quantity in the frontend
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += 1;
            setCart(updatedCart);
          } else {
            console.error('Failed to update quantity in the cart.');
          }
        } else {
          // If the medicine is not in the cart, add it as a new item
          const response = await axios.post(
            `/api/patients/${user.id}/cart/medicine`,
            {
              medicineId,
              quantity,
              price
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              }
            }
          );
          
    
          if (response.status===201 || response.status===200) {
            // Handle the successful addition to the cart
            console.log('Item added to cart.');
            localStorage.setItem('cart', JSON.stringify(response.data))
            setCart(response.data.cartItems)
            
          } else {
            console.error('Failed to add item to cart.');
          }
        }
      } catch (error) {
        console.error('Error adding/updating item in the cart:', error);
      }

  }
  else{

    try {
      const response = await axios.post(
        `/api/patients/${user.id}/cart/medicine`,
        {
          medicineId,
          quantity,
          price
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        }
      );
      
      if (response.status===201 || response.status===200) {
        // Handle the successful addition to the cart
        console.log('Item added to cart.');
        localStorage.setItem('cart', JSON.stringify(response.data))
        
        setCart(response.data.cartItems)
      } else {
        console.error('Failed to add item to cart.');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
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
        console.log('Item removed from cart.');
        localStorage.setItem('cart', JSON.stringify(response.data))
        console.log("22",response.data)
        setCart(response.data.cartItems)
        

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
    <div className="home2">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedUse}
          onChange={(e) => setSelectedUse(e.target.value)}
        >
          <option value="">All Uses</option>
          {uniqueUses.map((use) => (
            <option key={use} value={use}>
              {use}
            </option>
          ))}
        </select>
      </div>
      <div className="medicine">
        {filteredMedicines.map((med) => (
          <div key={med._id} className="medicine-item">
            <MedicineDetails medicine={med} />
            <button
              onClick={() => addToCart(med._id, 1, med.price)}
              className="add-to-cart-button"
            >
              Add to Cart
            </button>
            <span className="cart-quantity">
              Quantity in Cart: {getCartItemQuantity(med._id)}
            </span>
            <button
              onClick={() => removeFromCart(med._id)}
              className="remove-from-cart-button"
            >
              Remove from Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PatientViewMedicine;
