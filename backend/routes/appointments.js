const express = require('express')
const router = express.Router()
const { createAppointment, getAppointments, getAppointment, deleteAppointment, updateAppointment, findIfAvailable, getUpcomingAppointments, getCancelledAppointments,getAppointmentsByDate } = require('../controllers/appointmentController')
const requireAuthPatient = require('../middleware/requireAuthPatient')
const requireAuthDoctor= require('../middleware/requireAuthDoctor')


//require Auth for all appointment routes
router.use(requireAuthPatient)
router.use(requireAuthDoctor)

//Create a newappointment
router.post('/', createAppointment)

//Get all appointments
router.get('/', getAppointments)

//Get confirmed appointments
router.get('/upcoming', getUpcomingAppointments)

//Get cancelled appointments
router.get('/cancelled', getCancelledAppointments)

//Check if appointment is avaialble for booking
router.get('/available', findIfAvailable)

//Finds appointments by date
router.get('/bydate', getAppointmentsByDate)

//Get a single appointments
router.get('/:id', getAppointment)

//Delete an appointment
router.delete('/:id', deleteAppointment)

//Update an appointment
router.patch('/:id', updateAppointment)

module.exports = router