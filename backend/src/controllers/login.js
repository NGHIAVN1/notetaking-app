const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dataUser = require('../models/users');
const cookie = require('cookie-parser');
require("dotenv").config({
    path: "./src/configs/.env"
})
function generateAccessToken(_id){
    return jwt.sign(_id, process.env.TOKEN_SECRET, {expiresIn: '18000s'})
}
module.exports ={
    
    async getLogin  (req, res){
    const data = await dataUser.find()
     try {;
        console.log(data.toString());
    res.json(data);    
     } catch (error) {
        res.status(404).send("")
     }
    
},


async authLogin(req, res){
    const {email, password, _id} = req.body;
    const data = await dataUser.findOne({ email: email });
    const accessToken = await generateAccessToken({_id: _id });
    console.log(data);
    console.log(accessToken)

    if(email){
        bcrypt.compare(password, data.password, (err, same)=>{
            if(same == true){
                 res.cookie('jwt', accessToken, {
                    httpOnly: true,
                    maxAge: 360000,
                    secure:true
                }).status(200).json({accessToken, success: true});
                
                console.log(accessToken)
                // res.redirect('/');
            }
            else{
                res.redirect('/Users/login');
            }
        })
        
    }
    else{
        (err)=>console.log(err)
        res.send("login fail");
    }
}
}