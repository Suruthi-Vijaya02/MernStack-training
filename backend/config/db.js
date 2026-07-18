const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_URI,
    );
    console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
     console.error("MongoDB Connection Error:");
  console.error(error.message);
  console.error(error);
  }
};


module.exports = connectToDb;