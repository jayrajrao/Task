const mongoose = require("mongoose");

const connectdb = () => {
 
  return mongoose
    .connect("mongodb://localhost:27017/Task")
    .then(() => {
      console.log("connection success");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectdb;