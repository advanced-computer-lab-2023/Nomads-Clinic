import React, { useState,useNavigate,useEffect } from 'react';
import CheckoutPageApp from './../../pages/Patient/CheckoutPageApp';
import { useAuthContext } from '../../hooks/useAuthContext';



const AvailableTimeDetails = ({ availableTime, onBook,doctor}) => {
    const { user } = useAuthContext();

    const [isExpanded, setIsExpanded] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const[userWallet,setUserWallet] = useState(0);

    const handleWallet = async () => {
        try {
          // Fetch the current user data from the server
          const userResponse = await fetch(`/api/patients/${user.id}`);
          const userData = await userResponse.json();
      
          // Check if the patient is already subscribed to any health package
          const { wallet } = userData;
          setUserWallet(wallet);
      
         return;
      
          // Fetch the selected health package data
         
        } catch (error) {
          console.error('Error subscribing to health package:', error);
        }
      };
      useEffect(() => {
        handleWallet();
      }, []);
    const toggleCart = () => {
        setShowCart(!showCart);
      };
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const handleBookClick = () => {
        // Log the availableTime before calling onBook
        console.log('Available Time:', availableTime);

        // Call the onBook function passed as a prop
       
    };
    return (
        <div className="doctor-details" onClick={toggleExpand}>
            <h4> Date: {availableTime.year}/{availableTime.month}/{availableTime.day}</h4>
            {isExpanded && (
                <div>
                    <p><strong>Time: </strong>{availableTime.time} :00 pm</p>
                    <div className='second' onClick={toggleCart}>
                        <div> Book appointment</div>
                    </div>
                   

                </div>
            )}
             {showCart && (
          <div className="cart-overlay">
            <div className="cart-modal"style={{ display: 'flex', flexDirection: 'column' }} >
            <CheckoutPageApp  aTime={availableTime}onBook={ onBook}doctor={doctor} availableTimeDay={availableTime.day}availableTimeMonth={availableTime.month}availableTimeYear={availableTime.year}availableTime={availableTime.time}/>
             <button onClick={toggleCart} style={{ marginTop: '10px' }}>Close Payemnt</button>
            </div>
            
          </div>
        )}
        </div>
        
    );
};

export default AvailableTimeDetails;
