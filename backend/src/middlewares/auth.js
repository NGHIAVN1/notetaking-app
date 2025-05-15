const users = require('../models/users');
const user = require('../models/users') 
const jwt = require('jsonwebtoken')
require('dotenv').config({
  path: './configs/.env'
});
module.exports = {
    
    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']
        if (!authHeader) return res.status(401).json({ message: "No token provided" });
        
        const token = authHeader.split(' ')[1]
        if (!token) return res.status(401).json({ message: "Invalid token format" });
        
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
            // Handle token verification errors
            if (err) {
                console.log("Token verification error:", err);
                
                // Handle specific JWT errors
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ message: "jwt expired" });
                } else if (err.name === "JsonWebTokenError") {
                    return res.status(401).json({ message: "invalid token" });
                }
                
                return res.status(403).json({ message: "Failed to authenticate token" });
            }
            
            // Check for valid decoded payload
            if (!decoded) {
                return res.status(403).json({ message: "Invalid token payload" });
            }
            
            // Verify that the user exists
            try {
                const userToken = await user.findById(decoded._id);
                if (!userToken) {
                    return res.status(401).json({ message: "User not found" });
                }
                
                // Attach user info to request for downstream middleware/routes
                req.userToken = userToken;
                req.decoded = decoded;
                
                console.log("Validation successful");
                res.setHeader("Authorization", `Bearer ${token}`);
                next();
            } catch (error) {
                console.error("Database error:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}


