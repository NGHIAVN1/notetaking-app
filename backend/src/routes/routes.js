const express = require("express");
const userLogin = require("../controllers/login");
const notes = require('../controllers/notes');
const userSignup = require("../controllers/signup");
const userLogout = require("../controllers/logout");
const auth =require('../middlewares/auth')
 const cors = require('cors');
 const routes = express.Router();

routes.use(cors());
routes.get('/auth', auth.authenticateToken, (req, res)=>{
 res.json();
});



routes.post('/users/signup', userSignup.signupUser);
//Login-Logout
routes.post("/users/login", userLogin.authLogin);
// routes.delete ("Users/logout", userLogout.LogoutUser)
// routes.post("/Notes/new", auth.newNote);
// routes.get("/Notes/new", auth.getNotes);
// routes.post('/Users/logout',auth.authenticateToken ,userLogout.LogoutUser);
// routes.post("/collection/new", auth.authenticateToken, collection.NewCollection);
// routes.get("/collection/display/", collection.GetCollection);
//CRUD routes notes
// routes.post("/notes/new", auth.authenticateToken, notes.CreateNotes);
// routes.get("/notes/show", notes.ReadNotes );
// routes.post('/notes/delete',notes.DeleteNotes);
// routes.post("/notes/update", notes.UpdatesNotes);

// ;
// routes.post("User/logout", user.ClearCookie);
module.exports =routes;
