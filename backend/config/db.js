const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error while connecting to database :", error);
    process.exit(1);
  }
};

module.exports = connectDB;
