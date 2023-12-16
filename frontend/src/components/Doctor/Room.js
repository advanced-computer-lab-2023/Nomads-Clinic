// Room.js
import socket from './socket';

const createOrJoinRoom = async ({ patientId, doctorId, onComplete }) => {
  try {
    const response = await fetch('/api/create-or-join-room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patientId,
        doctorId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create or join room');
    }

    const { roomId } = await response.json();
    console.log(`Joined room with ID: ${roomId}`);

    // Connect to the room using the existing socket instance
    socket.emit('join room', roomId, (result) => {
      console.log(result);

      // Call the onComplete callback with the roomId
      if (onComplete) {
        onComplete(roomId);
      }
    });

    return roomId;
  } catch (error) {
    console.error('Error creating or joining room:', error);
  }
};

export default createOrJoinRoom;
