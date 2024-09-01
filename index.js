const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const connectdb = require("./DB/connectdb");
const { User } = require('./models/UserModel');
// const userRouter = express.Router();
const userRouter = require('./routes/userRoutes'); // Use `require` since you are in CommonJS
const collegeRouter = require('./routes/collegeRouter')

// Connect to the database
connectdb();
// Uncomment if you need CORS support
const cors = require("cors");
// Middleware to parse JSON and URL-encoded data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Define routes
app.use("/api", userRouter);
app.use('/api', collegeRouter)
// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
