const express = require('express');
const router = express.Router();
const User = require('../models/user');
router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const user = new User({username, password});
    try {
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
}   );