// utils/jwt.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require("dotenv").config({
    path: "./src/configs/.env"
});

dotenv.config();

const generateToken = (userId) => {
  return jwt.sign({ user_id: userId }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

module.exports = { generateToken };
