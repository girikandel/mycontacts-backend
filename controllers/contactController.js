const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// @desc Get all Contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    console.log(contacts);
    res.status(200).json(contacts);
})

// @desc Create new Contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({ name, email, phone, user_id: req.user.id });
    res.status(201).json(contact);
})

// @desc Get Contact
// @route Get /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.find({ _id: req.params.id, user_id: req.user.id });
    if (!contact) {
        res.status(404);
        console.log("Error");
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})

// @desc Update new Contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        console.log("Error");
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact);
})

// @desc Delete new Contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        console.log("Error");
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to delete other user contact");
    }
    console.log("Found");
    await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json(contact);
})

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact, };