const express= require('express')
const { getPatients, getPatient, deletePatient, updatePatient,updatePatientPassword, signupPatient,loginPatient,addMedicineToCart,fetchCartItems,decreaseMedicineQuantity, updateMedicineQuantityInCart,addAddress,getAllAddresses,createOrder,
  cancelOrder,
  getAllOrdersForPatient
} = require('../controllers/patientController')
const router= express.Router()
const stripe = require('stripe')('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');
//Get all patients
router.get('/', getPatients)

 //Get a single patient
 router.get('/:id', getPatient)

 //Sign up as a patient
 router.post('/signup',signupPatient)

 //Log in as a patient
  router.post('/login',loginPatient)

 //Delete a patient
 router.delete('/:id',deletePatient)

 //Update a patient
  router.patch('/:id',updatePatient)

  router.patch('/changepassword/:id',updatePatientPassword)


  router.post('/:patientId/cart/medicine', addMedicineToCart);

  router.get('/:patientId/cart',fetchCartItems)
  router.put('/:patientId/cart/:medicineId', updateMedicineQuantityInCart);
  router.put('/:patientId/cart/:medicineId/decrease', decreaseMedicineQuantity);

  router.post('/:patientId/addAddress',addAddress);
  router.get('/:patientId/getAddress',getAllAddresses);
  router.post('/pay', async (req, res) => {
    const { payment_method, amount, currency } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method,
        confirmation_method: 'manual',
        confirm: true,
      });
  
      res.json({ success: true, paymentIntent });
    } catch (error) {
      console.error(error);
      res.json({ success: false, error: 'Payment failed' });
    }
  });

  router.post('/createOrder',createOrder);
  router.put('/:orderId/cancelOrder',cancelOrder);
  router.get('/:patientId/getOrders',getAllOrdersForPatient)
  

module.exports= router