const mongoose = require('mongoose');

// Define schema for college
const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'College name is required'],
    trim: true, // Removes extra spaces from the beginning and end
  },
  location: {
    type: String,
    required: [true, 'College location is required'],
    trim: true,
  },
  courses: {
    type: [String], // Array of strings to hold multiple courses
    validate: [arrayLimit, 'Courses should be an array of strings'],
  },
  fees: {
    type: Number,
    required: [true, 'College fees are required'],
    min: [0, 'Fees must be a positive number'], // Ensure fees are not negative
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Validator function to ensure the courses array is not empty
function arrayLimit(val) {
  return val.length > 0;
}

// Create model from schema
const College = mongoose.model('College', collegeSchema);

module.exports = College;