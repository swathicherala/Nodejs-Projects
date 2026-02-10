const express = require('express')
const router = express.Router()
const {getContacts, createContact, getContact, updateContact, deleteContact} = require('../controllers/contactController')
const validateToken = require('../middleware/validateHandler')

router.route('/').get(validateToken,getContacts)

router.route('/:id').get(validateToken,getContact)

router.route('/').post(validateToken,createContact)

router.route('/:id').put(validateToken,updateContact)

router.route('/:id').delete(validateToken, deleteContact)

module.exports = router