const express= require('express')
const router= express.Router()
const {uploadDocument} = require('../controllers/documentController')
const upload = require('../middleware/upload')



 //Upload health document as a patient
 router.post('/upload', upload.single('document'),uploadDocument)


module.exports= router