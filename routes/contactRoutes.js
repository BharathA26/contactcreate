const express = require("express");
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels.js");

const router = express.Router();

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createContacts = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
  
    const { name, email, phone, user_id } = req.body;
  
    // Check if any of the mandatory fields are missing or empty
    if (!name || !email || !phone || !user_id) {
      res.status(400).json({ error: "All fields are mandatory!" });
      return;
    }
  
    try {
      const contact = await Contact.create({
        name,
        email,
        phone,
        user_id,
      });
  
      res.status(201).json(contact);
    } catch (error) {
      // Handle other types of errors
      console.error("Error creating contact:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id);
    if(!contacts) {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contacts);
  });
 
//@desc update  all contacts
//@route update /api/contacts
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id);
    if(!contacts) {
        res.status(404);
        throw new Error("Contact not found")
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(200).json(updateContact);
  });
//@desc delete contacts
//@route delete /api/contacts
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id);
    if(!contacts) {
        res.status(404);
        throw new Error("Contact will be deleted")
    }
    const deleteContact = await Contact.findByIdAndDelete(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(200).json(deleteContact);
  });

// Define your routes using the router instance
router.get("/getContacts", getContacts);
router.post("/postContacts", createContacts);
router.get("/getContacts/:id", getContact);
router.put("/getContacts/:id", updateContact);
router.delete("/getContacts/:id", deleteContact);

module.exports = router;
