// ChatPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Import the useParams hook
import { useAuthContext } from '../../hooks/useAuthContext';


import socket from './socket';

const ChatPage = () => {
    const { roomId } = useParams(); 
    const { user } = useAuthContext(); // Use the useParams hook to get parameters from the URL

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      console.log('Received new message:', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // Subscribe to the 'chat message' event
    socket.on('chat message', handleNewMessage);

    // Cleanup: Unsubscribe from the 'chat message' event when the component is unmounted
    return () => {
      socket.off('chat message', handleNewMessage);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim() !== '') {
      // Update UI with the sent message
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'patient' }]);

      // Emit the message
      socket.emit('chat message', { text: message, sender: user.type, roomId: roomId });

      // Clear the input field
      setMessage('');
    }
  };

  console.log('Rendering ChatPage');

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.sender === 'patient' ? 'You: ' : 'Doctor: '}
            {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
