require('dotenv').config()

const Appointment = require('../models/appointmentModel')
const mongoose = require('mongoose')


//Create a new Family Member 
const createAppointment = async (req, res) => {


    //add doc to db
    try {

        if (req.patient) {
            const patientId = req.patient._id;

            const { year, month, day, time, doctorId, status } = req.body

            let emptyFields = []
        
            if (!year) {
                emptyFields.push('year')
            }
            if (!month) {
                emptyFields.push('month')
            }
            if (!day) {
                emptyFields.push('day')
            }
            if (!time) {
                emptyFields.push('time')
            }
            if (!doctorId) {
                emptyFields.push('doctorId')
            }
            if (!status) {
                emptyFields.push('status')
            }
            if (emptyFields.length > 0) {
                return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
            }
            const appointment = await Appointment.create({ year, month, day, time, doctorId, status, patientId })
            res.status(200).json(appointment)
        }
        if (req.doctor) {
            const doctorId = req.doctor._id;


            const { year, month, day, time, patientId, status } = req.body

            let emptyFields = []
        
            if (!year) {
                emptyFields.push('year')
            }
            if (!month) {
                emptyFields.push('month')
            }
            if (!day) {
                emptyFields.push('day')
            }
            if (!time) {
                emptyFields.push('time')
            }
            if (!patientId) {
                emptyFields.push('patientId')
            }
            if (!status) {
                emptyFields.push('status')
            }
            if (emptyFields.length > 0) {
                return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
            }
            const appointment = await Appointment.create({ year, month, day, time, doctorId, status, patientId })
            res.status(200).json(appointment)
        }
   
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//get all appointments
const getAppointments = async (req, res) => {

    try {
        let appointments;


        if (req.patient) {
            // If a patient is logged in, retrieve appointments for the patient
            const patientId = req.patient._id;
            appointments = await Appointment.find({ patientId }).sort({ createdAt: -1 });
        }
        else if (req.doctor) {

            // If a doctor is logged in, retrieve appointments for the doctor
            console.log('doc')
            const doctorId = req.doctor._id;
            appointments = await Appointment.find({ doctorId }).sort({ createdAt: -1 });
        }


        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
//get all  confirmed appointments
const getAppointmentsByStatus = async (req, res) => {

    const { status } = req.query

    try {
        let appointments;


        if (req.patient) {
            // If a patient is logged in, retrieve appointments for the patient
            const patientId = req.patient._id;
            appointments = await Appointment.find({ status, patientId }).sort({ createdAt: -1 });
        }
        else if (req.doctor) {
            // If a doctor is logged in, retrieve appointments for the doctor
            const doctorId = req.doctor._id;
            appointments = await Appointment.find({ status, doctorId }).sort({ createdAt: -1 });
        }

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const findIfAvailable = async (req, res) => {
    try {
        const { year, month, day, time, doctorId } = req.query; // Access time from query parameters
        console.log(time)

        // Query the database to find appointments with the specified time
        const appointments = await Appointment.find({ year: year, month: month, day: day, time: time, doctorId: doctorId, status: 'Confirmed' }).sort({ createdAt: -1 });

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getAppointmentsByDate = async (req, res) => {
    try {
        const { year, month, day } = req.query; // Access time from query parameters

        // Query the database to find appointments with the specified time
        const appointments = await Appointment.find({ year: year, month: month, day: day }).sort({ createdAt: -1 });

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



//Get a single appointment
const getAppointment = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such appointment' })
    }

    const appointment = await Appointment.findById(id)

    if (!appointment) {
        return res.status(404).json({ error: 'No such appointment' })
    }

    res.status(200).json(appointment)
}

//Delete an appointment
const deleteAppointment = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such appointment' })
    }

    const appointment = await Appointment.findOneAndDelete({ _id: id })


    if (!appointment) {
        return res.status(404).json({ error: 'No such appointment' })
    }

    res.status(200).json(appointment)
}

//Update an appointment
const updateAppointment = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such appointment' })
    }

    const appointment = await Appointment.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!appointment) {
        return res.status(404).json({ error: 'No such appointment' })
    }
    res.status(200).json(appointment)

}
module.exports = {
    createAppointment,
    getAppointments,
    getAppointment,
    deleteAppointment,
    updateAppointment,
    findIfAvailable,
    getAppointmentsByStatus,
    getAppointmentsByDate
}