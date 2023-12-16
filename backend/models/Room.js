// Room.js

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Replace 'Patient' with your actual patient model name
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // Replace 'Doctor' with your actual doctor model name
    required: true,
  },
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
