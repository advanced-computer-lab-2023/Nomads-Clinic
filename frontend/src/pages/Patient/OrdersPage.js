
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

const OrdersPage = () => {
    const { user } = useAuthContext();
    const patientId = user ? user.id : null;
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
  
    const handleCancelOrder = async (orderId) => {
      try {
        // Send a request to cancel the order
        await axios.put(`/api/patients/${orderId}/cancelOrder`, { patientId }, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
  
        // If successful, reload the orders
        fetchOrders();
      } catch (error) {
        console.error('Error canceling order:', error);
        // Handle error, show a message, etc.
      }
    };
  
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/patients/${patientId}/getOrders`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (response.status === 200 || response.status === 201) {
          setOrders(response.data.orders);
          setLoadingOrders(false);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoadingOrders(false);
      }
    };
  
    useEffect(() => {
      if (patientId) {
        fetchOrders();
      }
    }, [patientId, user]);
  
    return (
      <div className="orders-container">
        <h2>Your Orders</h2>
        {loadingOrders ? (
          <p>Loading orders...</p>
        ) : (
          <ul>
            {orders.map(order => (
              <li key={order._id}>
                <h3>Order Details</h3>
                <p>Status: {order.status}</p>
                <p>Total Price: ${order.totalPrice}</p>
                <p>Payment Method: {order.paymentMethod}</p>
                {order.address && (
                  <p>
                    Address: {order.address.street}, {order.address.city}, {order.address.state}, {order.address.postalCode}
                  </p>
                )}
                <h4>Ordered Items:</h4>
                <ul>
                  {order.items.map(item => (
                    <li key={item._id}>
                      {item.medicine.name} - Quantity: {item.quantity} - Price: ${item.price}
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleCancelOrder(order._id)}>Cancel Order</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
export default OrdersPage;