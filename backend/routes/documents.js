const express= require('express')
const router= express.Router()
const {uploadDocument, getDocuments, deleteDocument} = require('../controllers/documentController')
const upload = require('../middleware/upload')



 //Upload health document as a patient
 router.post('/upload', upload.single('document'),uploadDocument)

  //Get health documents of a patient
  router.get('/:id', getDocuments)

  //Delete a health document
  router.delete('/:id', deleteDocument)


module.exports= router