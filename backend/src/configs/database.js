const mongoose = require('mongoose');
require("dotenv").config({path: '.env'});

/**
 * Connect to MongoDB database
 */
async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to database-app successfully");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    throw err;
  }
}

// Initial connection
connectDb().catch(err => {
  console.log("Failed to connect to database:", err);
  process.exit(1); // Exit on connection failure
});

module.exports = mongoose.connection;
