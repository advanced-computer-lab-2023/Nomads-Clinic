require('dotenv').config()
 
 const Patient = require('../models/patientModel')
 const mongoose= require('mongoose')
 const jwt= require('jsonwebtoken')
 const bcrypt = require('bcrypt')
 const validator= require('validator')
 const Address = require('../models/addressModel');
 const Order = require('../models/OrderModel');

 



 const createToken= (_id) => {
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'})
}



//Get all patients
const getPatients= async (req,res) => {
    const patients = await Patient.find({}).sort({createdAt: -1 })

    res.status(200).json(patients)
}

//Get a single patient
const getPatient= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such patient'})
    }

    const patient= await Patient.findById(id)

    if(!patient){
        return res.status(404).json({error: 'No such patient'})
    }
    
    res.status(200).json(patient)
}

//Delete a patient
const deletePatient = async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such patient'})
    }

    const patient= await Patient.findOneAndDelete({_id: id})


    if(!patient){
        return res.status(404).json({error: 'No such patient'})
    }

    res.status(200).json(patient)
}

//Update a patient
const updatePatient= async (req,res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such patient'})
    }

    const patient = await Patient.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!patient){
        return res.status(404).json({error: 'No such patient'})
    }
    res.status(200).json(patient)
}
const updatePatientPassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body; // Get the new password from the request body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such patient' });
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: 'Password is not strong enough' });
    }

    const salt= await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)

    const patient = await Patient.findByIdAndUpdate(
        { _id: id },
        { password:hash } // Update the patient's password
    );

    if (!patient) {
        return res.status(404).json({ error: 'No such patient' });
    }

    res.status(200).json(patient);
};

//login patient
const loginPatient= async (req,res) => {

    const {email,password}= req.body


    try{
        const patient = await Patient.login(email,password)

        //create a token
        const token = createToken(patient._id)
        const id= patient._id

        const type = "patient"

        res.status(200).json({type,id,email,token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

}
//signup new patient
const signupPatient= async (req,res) => {
    const {username,firstName,lastName,email,password,dateOfBirth,gender,mobileNumber,emergencyContact}= req.body

    try{
        const patient = await Patient.signup(username,firstName,lastName,email,password,dateOfBirth,gender,mobileNumber,emergencyContact)

        //create a token
        const token = createToken(patient._id)
        const id= patient._id

        const type = "patient"

        res.status(200).json({type,id,email,token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }


}
const addMedicineToCart = async (req, res) => {
    const { patientId } = req.params;
    const { medicineId, quantity, price } = req.body;

    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Add medicine to cart with price
        patient.cart.push({ medicine: medicineId, quantity, price });
        await patient.save();

        const updatedPatient = await Patient.findById(patientId).populate('cart.medicine');
        res.status(201).json({ message: 'Medicine added to cart successfully', cartItems: updatedPatient.cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMedicineQuantityInCart = async (req, res) => {
    const { patientId, medicineId } = req.params;
    
  
    try {
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      // Find the index of the medicine in the cart
      const cartIndex = patient.cart.findIndex((item) => item.medicine.equals(medicineId));
  
      // If the medicine is not in the cart, return an error
      if (cartIndex === -1) {
        return res.status(404).json({ error: 'Medicine not found in the cart' });
      }
  
      // Update the quantity
      patient.cart[cartIndex].quantity ++;
      
      // Save the changes
      await patient.save();
  
      res.status(200).json({ message: 'Quantity updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const fetchCartItems = async (req, res) => {
    const { patientId } = req.params;

    try {
        const patient = await Patient.findById(patientId).populate('cart.medicine');
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.status(200).json({ cartItems: patient.cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const decreaseMedicineQuantity = async (req, res) => {
    const { patientId, medicineId } = req.params;
  
    try {
      const patient = await Patient.findById(patientId);
  
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      // Find the index of the medicine in the cart
      const cartIndex = patient.cart.findIndex(
        (item) => item.medicine.toString() === medicineId
      );
  
      if (cartIndex === -1) {
        return res.status(404).json({ error: 'Medicine not found in the cart' });
      }
  
      // Decrease the quantity
      if (patient.cart[cartIndex].quantity > 1) {
        patient.cart[cartIndex].quantity--;
      } else {
        // Remove the medicine if the quantity is 1
        patient.cart.splice(cartIndex, 1);
      }
  
      await patient.save();
      const updatedPatient = await Patient.findById(patientId).populate('cart.medicine');
  
      res.status(200).json({ message: 'Medicine quantity updated successfully',cartItems: updatedPatient.cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const addAddress = async (req, res) => {
    try {
      const { patientId } = req.params; // Extract patientId from params
      const { street, city, state, postalCode } = req.body;
      const newAddress = new Address({
        patient: patientId,
        street,
        city,
        state,
        postalCode,
      });
  
      const savedAddress = await newAddress.save();
      res.status(201).json(savedAddress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



const getAllAddresses = async (req, res) => {
  try {
    const patientId = req.params.patientId; // Extract patientId from params
    const patientAddresses = await Address.find({ patient: patientId }).exec();
    res.status(200).json(patientAddresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createOrder = async (req, res) => {
    try {
      const { patientId, items, totalPrice, address, paymentMethod } = req.body;
  
      // Validate that required fields are present
      if (!patientId || !items || !totalPrice || !address || !paymentMethod) {
        return res.status(400).json({ error: 'Missing required fields in the request.' });
      }
  
      // Create the order
      const order = new Order({
        patientId,
        items,
        totalPrice,
        address,
        paymentMethod,
      });
  
      // Save the order
      await order.save();
  
      // Assuming you have a reference to the Patient model
      // Update the patient's cart (empty the cart)
      // Note: Adjust the field names based on your actual Patient schema
      const patient = await Patient.findByIdAndUpdate(patientId, { $set: { cart: [] } }, { new: true });
  
      res.status(201).json({ message: 'Order created successfully.', order });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Error creating order.' });
    }
  };
  

const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { patientId } = req.body; // Assuming patientId is included in the request body
    
        // Find the order
        const order = await Order.findById(orderId);
    
        // Check if the requesting patient is the owner of the order
        if (order && order.patientId.toString() === patientId) {
          // Assuming there's a method to cancel an order in your Order model
          const updatedOrder = await Order.findByIdAndUpdate(orderId, { $set: { status: 'cancelled' } });
    
          res.status(200).json({ message: 'Order cancelled successfully', order: updatedOrder });
        } else {
          res.status(403).json({ error: 'Unauthorized' });
        }
      } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  };

  const getAllOrdersForPatient = async (req, res) => {
    try {
      const { patientId } = req.params;
  
      // Fetch all orders for the patient and populate the 'address' and 'items.medicine' fields
      const orders = await Order.find({ patientId: patientId })
        .populate('address')
        .populate('items.medicine');
  
      res.status(200).json({ orders: orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports= {
    getPatients,
    getPatient,
    deletePatient,
    updatePatient,
    updatePatientPassword,
    signupPatient,
    loginPatient,
    addMedicineToCart,
    fetchCartItems,
    updateMedicineQuantityInCart,
    decreaseMedicineQuantity,
    addAddress,
    getAllAddresses,
    createOrder,
    cancelOrder,
    getAllOrdersForPatient
}