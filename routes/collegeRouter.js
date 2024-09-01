const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const college = require('../models/CollageModel')
// import authenticateToken from '../middlewares/authenticateToken';

const collegeRouter = express.Router();

collegeRouter.post('/add', async (req, res) => {
    const { name, location, courses, fees } = req.body;
  
    try {
      const newCollege = new college({ name, location, courses, fees });
      await newCollege.save();
      res.status(201).json({
        message: 'College added successfully',
        college: newCollege,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error adding college', error });
    }
  });

  collegeRouter.get('/list', async (req, res) => {
    try {
      const colleges = await college.find();
      res.status(200).json(colleges);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving colleges', error });
    }
  });
  
  // Update College
  collegeRouter.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
  
    try {
      const updatedCollege = await college.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedCollege) {
        return res.status(404).json({ message: 'College not found' });
      }
      res.status(200).json({
        message: 'College updated successfully',
        college: updatedCollege,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating college', error });
    }
  });
  
  // Delete College
  collegeRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedCollege = await college.findByIdAndDelete(id);
      if (!deletedCollege) {
        return res.status(404).json({ message: 'College not found' });
      }
      res.status(200).json({ message: 'College deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting college', error });
    }
  });
  

module.exports =  collegeRouter ;