require('dotenv').config()

const express= require('express')
const mongoose= require('mongoose')

const pharmacistRoutes= require('./routes/pharmacists')
const medicineRoutes= require('./routes/medicine')
const healthPackageRoutes= require('./routes/healthPackages')
const availableTimeRoutes = require('./routes/availableTimes')
const familyMemberRoutes = require('./routes/familyMembers')
const prescriptionRoutes= require('./routes/prescriptions')
const appointmentRoutes= require('./routes/appointments')
const clinicPriceRoutes= require('./routes/clinicPrice')
const patientRoutes= require('./routes/patients')
const doctorRoutes= require('./routes/doctors')
const adminRoutes = require('./routes/admins')
const healthRecordsRoutes = require('./routes/healthRecords')
//const otpRoutes = require('./routes/otp')

global.__basedir = __dirname;

//express app
const app= express() 

//middleware
 app.use(express.json())
 app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
 })

//routes

app.use('/api/pharmacists',pharmacistRoutes)
app.use('/api/medicine',medicineRoutes)
 app.use('/api/healthpackages',healthPackageRoutes) 
 app.use('/api/availableTimes',availableTimeRoutes)
 app.use('/api/familymembers',familyMemberRoutes)
 app.use('/api/prescriptions',prescriptionRoutes)
 app.use('/api/appointments',appointmentRoutes)
 app.use('/api/clinicprice',clinicPriceRoutes)
 app.use('/api/patients',patientRoutes)
 app.use('/api/doctors',doctorRoutes)
 app.use('/api/admins',adminRoutes)
 app.use('/api/healthrecords',healthRecordsRoutes)
 //app.use('/uploads', express.static('uploads'));
 //app.use('/api/otp',otpRoutes)


//Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log(' connected to db and listening on port',process.env.PORT)
        })

    })
    .catch((error) => {
        console.log(error)
    })

