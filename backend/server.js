require('dotenv').config();
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const express = require('express');
const mongoose = require('mongoose');

const pharmacistRoutes = require('./routes/pharmacists');
const medicineRoutes = require('./routes/medicine');
const healthPackageRoutes = require('./routes/healthPackages');
const availableTimeRoutes = require('./routes/availableTimes');
const familyMemberRoutes = require('./routes/familyMembers');
const prescriptionRoutes = require('./routes/prescriptions');
const appointmentRoutes = require('./routes/appointments');
const clinicPriceRoutes = require('./routes/clinicPrice');
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const adminRoutes = require('./routes/admins');
const healthRecordsRoutes = require('./routes/healthRecords');
const Room = require('./models/Room');

global.__basedir = __dirname;

// express app
const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ['websocket'], // Explicitly specify the 'websocket' transport
});
app.set('socketio', io);

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/pharmacists', pharmacistRoutes);
app.use('/api/medicine', medicineRoutes);
app.use('/api/healthpackages', healthPackageRoutes);
app.use('/api/availableTimes', availableTimeRoutes);
app.use('/api/familymembers', familyMemberRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/clinicprice', clinicPriceRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/healthrecords', healthRecordsRoutes);
app.use('/uploads', express.static('uploads'));

app.post('/api/create-or-join-room', async (req, res) => {
    const { patientId, doctorId } = req.body;
  
    try {
      // Assuming you have a Room model in your database
      const existingRoom = await Room.findOne({ patientId, doctorId });
  
      if (existingRoom) {
        // Room already exists, return its ID
        res.json({ roomId: existingRoom.roomId });
      } else {
        // Room doesn't exist, create a new room
        const roomId = uuidv4(); // Generate a unique room ID
  
        // Assuming you have a Room schema defined
        const newRoom = new Room({
          patientId,
          doctorId,
          roomId,
        });
  
        await newRoom.save();
  
        res.json({ roomId });
      }
    } catch (error) {
      console.error('Error creating or joining room:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  io.on('connection', (socket) => {
    console.log('User connected: ', socket.id);
  
    socket.on('join room', async (roomId, callback) => {
      try {
        const room = await Room.findOne({ roomId });
  
        if (room) {
          socket.join(roomId);
  
          // Check if callback is a function before calling it
          if (typeof callback === 'function') {
            callback({ status: 'success', message: 'Room joined successfully' });
          }
        } else {
          // Check if callback is a function before calling it
          if (typeof callback === 'function') {
            callback({ status: 'error', message: 'Invalid room ID' });
          }
        }
      } catch (error) {
        console.error('Error finding room:', error);
  
        // Check if callback is a function before calling it
        if (typeof callback === 'function') {
          callback({ status: 'error', message: 'Internal Server Error' });
        }
      }
    });
  
    socket.on('chat message', (message) => {
      console.log(`Received message:`, message);
      // Broadcast to all connected clients in the same room except the sender
      socket.broadcast.to(message.roomId).emit('chat message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected: ', socket.id);
    });
  });
  
  io.on('connect_error', (err) => {
    console.log(`Socket.IO connection error: ${err.message}`);
  });
  

// Connect to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  server.listen(process.env.PORT, () => {
    console.log('Connected to db and listening on port', process.env.PORT);
  });
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
