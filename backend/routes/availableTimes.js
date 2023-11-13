const express= require('express')
const router= express.Router()
const {createAvailableTime,getAvailableTimes,getAvailableTimesByDate,getAvailableTimesNotBooked,getAvailableTime,deleteAvailableTime,updateAvailableTime} = require('../controllers/availableTimeController')
const requireAuthDoctor = require('../middleware/requireAuthDoctor')
const requireAuthPatient = require('../middleware/requireAuthPatient')


//require Auth for all Available Times routes
router.use(requireAuthDoctor)

router.use(requireAuthPatient)

 //Create a new Available Time
 router.post('/',createAvailableTime)

 //Get all Available Times
 router.get('/',getAvailableTimes)

 router.get('/ByDate',getAvailableTimesByDate)


 router.get('/NotBooked',getAvailableTimesNotBooked)

 //Get a single Available Time
 router.get('/:id',getAvailableTime)

 //Delete a Available Time
 router.delete('/:id',deleteAvailableTime)

 //Update a Available Time
  router.patch('/:id',updateAvailableTime)

module.exports= router