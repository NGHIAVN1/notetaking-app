const dataUser = require('../models/users')
module.exports =
{
    async signupUser(req, res) {
    const data = new  dataUser(req.body);
    try {
        await data.save();
        res.status(200).redirect("/users/login");
    } catch (error) {
            console.log(error),
            res.redirect('/users/signup');
    }
}}