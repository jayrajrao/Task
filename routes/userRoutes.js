const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const User = require("../models/UserModel");

const userRouter = express.Router();

// Use a secure secret key for JWT
const secretKey = "Ram123";

// User registration route
userRouter.post("/register", async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
  
    try {
      // Hash the user's password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
        userId: uuidv4(), // Generate unique ID
      });
      
      console.log("New User:", newUser);
  
      // Save the new user to the database
      await newUser.save();
      res.status(201).json({
        message: "User registered successfully",
        userId: newUser.userId,
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Error registering user", error });
    }
});

// User login route
userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get user by ID route
userRouter.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  console.log("Fetching user with ID:", userId);
  
  try {
      // Ensure `userId` field is used correctly in the query
      const user = await User.findOne({ userId: userId });
      console.log("User found:", user); // Log the user object
      
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
  } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).json({ message: "Error retrieving user", error });
  }
});

// Update user by ID route
userRouter.put("/users/:id", async (req, res) => {
  const { username, password } = req.body;

  try {
      // Find user by userId
      const user = await User.findOne({ userId: req.params.id });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Update the user's details if provided
      if (username) user.username = username;
      if (password) user.password = await bcrypt.hash(password, 10);

      await user.save();
      res.json({ message: "User updated successfully" });
  } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user", error });
  }
});

// Delete user by ID route
userRouter.delete("/users/:id", async (req, res) => {
  try {
      // Find user by userId and delete
      const user = await User.findOneAndDelete({ userId: req.params.id });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
  } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user", error });
  }
});

module.exports = userRouter;
