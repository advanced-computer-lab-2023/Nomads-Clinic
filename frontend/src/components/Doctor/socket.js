// socket.js
import io from 'socket.io-client';

const socket = io('http://localhost:9000', {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttempts: 10,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
  withCredentials: true,
});

export default socket;
