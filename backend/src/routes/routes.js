const express = require("express");
const userLogin = require("../controllers/login.controller");
const notes = require('../controllers/notes.controller');
const userSignup = require("../controllers/signup.controller");
const userLogout = require("../controllers/logout");
const auth =require('../middlewares/auth')
const cors = require('cors');
const label = require("../controllers/labels.controller");
const trash = require("../controllers/trash.controller");
const routes = express.Router();
const checklist = require("../controllers/checklist.controller");
const multer_config = require("../middlewares/multer_config");
const collectionController = require("../controllers/collection.controller");
// const label = require('../controllers/labels')
routes.use(cors());
routes.get('/auth', auth.authenticateToken, (req, res)=>{
 res.json();
});

routes.post('/users/signup', userSignup.signupUser);
//Login-Logout
routes.post("/users/login", userLogin.authLogin);
// routes.delete ("Users/logout", userLogout.LogoutUser)
// routes.post("/notes/new", a);
// routes.get("/Notes/new", auth.getNotes);
// routes.post('/Users/logout',auth.authenticateToken ,userLogout.LogoutUser);
routes.post("/labels/new", auth.authenticateToken, label.newLabel)
routes.get("/labels", auth.authenticateToken, label.getLabels);
;
// routes.get("/collection/display/", collection.GetCollection);
//CRUD routes notes
routes.post("/notes/new", auth.authenticateToken, multer_config, notes.CreateNotes);
routes.get("/notes/", auth.authenticateToken, notes.ReadNotes);
routes.post("/notes/update", auth.authenticateToken, notes.UpdatesNotes); // Uncommented and added auth middleware
routes.post('/notes/delete', auth.authenticateToken, notes.DeleteNotes); // Uncommented and added auth middleware

routes.get("/notes/checklist", auth.authenticateToken, checklist.GetChecklistNotes);
routes.post("/checklist/update-item/:id", auth.authenticateToken, checklist.updateChecklistItem);

routes.get("/trash/get", auth.authenticateToken, trash.getTrashItems); 
routes.post("/trash/delete", auth.authenticateToken, trash.deleteTrashItem);
routes.post("/trash/restore", auth.authenticateToken, trash.restoreTrashItem);


// routes.get("/collection/get-notes",auth.authenticateToken, collectionController.getCollectionNotes);
routes.post("/collection/new", auth.authenticateToken, collectionController.createNotesCollection);
routes.get("/collection/get", auth.authenticateToken, collectionController.getNotesCollection);
// routes.post('/notes/checklist', auth.authenticateToken, notesController.createChecklistNote);
// routes.get('/notes/checklists', auth.authenticateToken, notesController.getChecklistNotes);
// routes.put('/notes/:id/checklist', auth.authenticateToken, notesController.updateChecklistItems);

// routes.get("/notes/show", notes.ReadNotes );
// routes.post('/notes/delete',notes.DeleteNotes);
// routes.post("/notes/update", notes.UpdatesNotes);
//CRUD checklist
routes.post("/checklist/new", auth.authenticateToken, checklist.createChecklistNotes)
// ;
// routes.post("User/logout", user.ClearCookie);
module.exports =routes;
