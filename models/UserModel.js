const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'user'], 
    default: 'user' 
  },
  userId: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4 // Automatically generates a unique ID
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const User = mongoose.model('User', userSchema);

module.exports = User;
