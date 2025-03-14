const collection =require('../models/collection');
const db = require('../models/users')
// const  decode = require('./decodetoken')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


module.exports ={
    async NewCollection(req, res){
        // let user = new mongoose.Types.ObjectId();

        const data = new collection({
            name: req.body.name,
            userId:  req.decoded.id
        });
        try {
            console.log(data);
           const collection_data = await data.save();
            res.json(collection_data)
        } catch (error) {
            res.send("Don't saved data ")
        }
    },
    async GetCollection(req, res){
        const data = await collection.find({ });
        try {
            console.log(data)
            res.json(data);
        } catch (error) {
            res.send(" Data not found ");

        }
    }
}