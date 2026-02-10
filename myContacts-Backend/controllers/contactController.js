//In Controllers You Write The Logic Of The Code
const asyncHandler = require('express-async-handler')// by this package you can avoid using try and catch block
const Contact = require('../models/contactModel')

//We use async and await because the mongodb always returns data in promises

//@desc GET all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find({user_id: req.user.id})
    console.log('USerrr', contacts)
    res.status(200).json(contacts)
}) 

//@desc Create all contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req,res) => {
    const {name, email, phone} = req.body //Object Destructring
    if(!name || !email || !phone) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    const contact = await Contact.create({
        name, email, phone, user_id: req.user.id
    })
    res.status(200).json(contact)
}) 

//@desc GET all contacts
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact Not Found")
    }
    res.status(200).json(contact)
}) 

//@desc UPDATE all contacts
//@route PUT /api/contacts
//@access private
const updateContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id)
    console.log('Contact', contact)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have permission to update other user contacts")
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body,{new:true})
    res.status(200).json(updatedContact)
}) 

//@desc DELETE all contacts
//@route DELETE /api/contacts
//@access public
const deleteContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id)
    console.log('Contact', contact)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have permission to update other user contacts")
    }

    await Contact.deleteOne({_id: req.params.id})
    res.status(200).json(contact)
}) 

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact}