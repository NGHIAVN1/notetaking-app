const user = require('../models/users') 
const jwt = require('jsonwebtoken')
require('dotenv').config();
const { configDotenv } = require('dotenv');



module.exports ={
    
       authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader.split(' ')[1]
        console.log(token)
        if (token == null) return res.sendStatus(401)
         jwt.verify(token, process.env.TOKEN_SECRET , async (err, decoded) => {
          console.log(err);
          const userToken = await user.findOne({_id: decoded.id});
          if (!userToken) return res.sendStatus(403);
          
          req.decoded = decoded;
          req.userToken = userToken;
          console.log(decoded.id);
          console.log("validate sucess");
          res.setHeader("Authorization", `Bearer ${token}`);
          // res.json({
          //     sucess: true,
          //    name: userToken.username
          // })
          next()      

        })

    },

 }


