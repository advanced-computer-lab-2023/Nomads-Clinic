import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import Cart from '../../components/Patient/Cart';
import React from 'react';
import StripeContainer from '../../components/Patient/StripeContainer';
import { useNavigate } from 'react-router-dom';


const CheckoutPage = () => {
  const history = useNavigate();
  const { user } = useAuthContext();
  const patientId = user ? user.id : null;
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: ''
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cashOnDelivery');
  const [selectedAddress,setSelectedAddress] = useState('');



  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`/api/patients/${patientId}/cart`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (response.status === 200 || response.status === 201) {
          setCart(response.data.cartItems);
          setLoadingCart(false);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoadingCart(false);
      }
    };

    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`/api/patients/${patientId}/getAddress`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (response.status === 200 ||response.status === 201) {
          setAddresses(response.data);
          setLoadingAddresses(false);
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setLoadingAddresses(false);
      }
    };

    if (patientId) {
      fetchCartItems();
      fetchAddresses();
    }
  }, [patientId, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/patients/${patientId}/addAddress`, newAddress, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (response.status === 200 || response.status === 201) {
        // Address added successfully, update the addresses
        setAddresses(prevAddresses => [...prevAddresses, response.data]);
        // Clear the form
        setNewAddress({
          street: '',
          city: '',
          state: '',
          postalCode: ''
        });
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const handleOrderPlacement = async () => {
    try {
      // Check if all required fields are available
      if (!patientId || !cart || !totalPrice || !selectedAddress || !selectedPaymentMethod) {
        console.error('Missing required fields for order placement.');
        return;
      }

      // Prepare the order data
      const orderData = {
        patientId,
        items: cart.map(item => ({
          medicine: item.medicine._id, // Assuming 'medicine' has an '_id' field
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice,
        address: selectedAddress,
        paymentMethod: selectedPaymentMethod,
      };

      // Make the API call to create the order
      const response = await axios.post('/api/patients/createOrder', orderData, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      // Handle the response accordingly
      if (response.status === 201) {
        // Order created successfully, you can perform additional actions or show a success message
        console.log('Order created successfully:', response.data);
        history('/orders');
      } else {
        console.error('Error creating order:', response.data);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };
  const handleAddressChange = (selectedAddressId) => {
    // Handle the selected address, you can update the state or perform other actions
    console.log('Selected Address ID:', selectedAddressId);
  
    // Update the selectedAddress state only if an address is selected, otherwise set it to an empty string
    setSelectedAddress(selectedAddressId !== 'Select an Address For shipping' ? selectedAddressId : '');
  };
  

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <div className="cart">
      <h2>Cart :</h2>
      {Array.isArray(cart) && cart.length > 0 ? (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.medicine.name} - Price: {item.price} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
          <p>Total Price: {totalPrice}</p>
         
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
      </div>
      <div className="address-section">
        <h3>Your shipping addresses:</h3>
        {loadingAddresses ? (
          <p>Loading addresses...</p>
        ) : (
          <>
            <ul>
              {addresses.map(address => (
                <li key={address._id}>
                  {address.street}, {address.city}, {address.state}, {address.postalCode}
                </li>
              ))}
            </ul>
            <form onSubmit={handleAddAddress}>
              <label>Street:
                <input type="text" name="street" value={newAddress.street} onChange={handleInputChange} />
              </label>
              <label>City:
                <input type="text" name="city" value={newAddress.city} onChange={handleInputChange} />
              </label>
              <label>State:
                <input type="text" name="state" value={newAddress.state} onChange={handleInputChange} />
              </label>
              <label>Postal Code:
                <input type="text" name="postalCode" value={newAddress.postalCode} onChange={handleInputChange} />
              </label>
              <button type="submit">Add Address</button>
            </form>
            <select onChange={(e) => handleAddressChange(e.target.value)}>
              <option >Select an Address For shipping</option>
              {addresses.map(address => (
                <option key={address._id} value={address._id}>
                  {address.street}, {address.city}, {address.state}, {address.postalCode}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      

      <div className="payment-method-section">
        <h3>Select Payment Method:</h3>
        <div>
          <label>
            <input
              type="radio"
              value="cashOnDelivery"
              checked={selectedPaymentMethod === 'cashOnDelivery'}
              onChange={handlePaymentMethodChange}
            />
            Cash on Delivery
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="creditCard"
              checked={selectedPaymentMethod === 'creditCard'}
              onChange={handlePaymentMethodChange}
            />
            Credit Card (Stripe)
          </label>
        </div>
      </div>
      {Array.isArray(cart) && cart.length > 0 && selectedAddress &&selectedPaymentMethod === 'creditCard' && <StripeContainer patientId={patientId} cart={cart} totalPrice={totalPrice} selectedAddress={selectedAddress} selectedPaymentMethod={selectedPaymentMethod} />}
      {Array.isArray(cart) && cart.length > 0 && selectedAddress && (
  <div className="order-details">
   
    
    

    {/* Additional content or confirmation button */}
    {selectedPaymentMethod === 'cashOnDelivery' && (
  <div className="order-details">
    {/* Additional content or confirmation button */}
    <button onClick={handleOrderPlacement}> Order</button>
  </div>
)}
  </div>
)}

    </div>
  );
};


export default CheckoutPage;

