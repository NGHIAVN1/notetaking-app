const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dataUser = require('../models/users');
const { generateToken } = require('../utils/jwt');
// cookie-parser not needed in controller file
require("dotenv").config({
    path: "./src/configs/.env"
});


module.exports = {
    async getLogin(req, res) {
        try {
            // Don't fetch all users - this is inefficient and a security risk
            // Only return necessary data if this endpoint is truly needed
            const users = await dataUser.find({}, { password: 0 }); // Exclude passwords
            res.json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Failed to fetch users" });
        }
    },

    async authLogin(req, res) {
        const { email, password } = req.body;
        
        try {
            // Find user by email only
            const user = await dataUser.findOne({ email });
            if (!user) {
                console.log("Account not found");
                return res.status(401).json({ error: "Invalid credentials" });
            }
            
            // Compare password first - await the promise properly
            const isMatch = await bcrypt.compare(password, user.password);
            
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            
            
            // Generate token with user's real ID from DB
            const accessToken = generateToken(user._id);
            console.log(user.id)
            // send acessToken to the client
            res.status(200).json({ 
                success: true,
                accessToken 
            });
            
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ error: "Login failed" });
        }
    }
};