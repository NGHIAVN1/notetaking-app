const dataNote = require('../models/notes');
const fs = require('fs');
const path = require('path');

module.exports= {
    async CreateNotes(req, res){
   
        console.log("www" + req.file);

        // Store just the filename or path as a string, not the entire file object
        const imagePath = req.file ? req.file.filename : undefined;
        
        const data = new dataNote({
            user_id: req.decoded._id,
            title: req.body.title,
            image: imagePath, // Save just the filename, not the entire file object
            content: req.body.content,
            collectionId: req.body.collectionId
        });
            try {
                const dataNote = await data.save();
                res.status(200).json(dataNote);
            } catch (error) {
                console.log(error)
                res.status(500).send("not found")
            } 
        
    },

    async ReadNotes(req, res) {
      try {
        // Only fetch notes belonging to the authenticated user
        const notes = await dataNote.find({ user_id: req.decoded._id , deleted: false})
          .populate('checklists')  // This populates the checklist items
          .sort({ updatedAt: -1 }); // Sort by most recently updated
        
        res.status(200).json(notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Failed to fetch notes" });
      }
    },
    
    async DeleteNotes(req, res){
        const data = await dataNote.findByIdAndUpdate(
            {_id: req.body._id},
            {deleted: true}
        ) 
        try {
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
        // const data = await dataNote.findByIdAndUpdate(
    },

    
    async UpdatesNotes(req, res){
        const data = dataNote.findByIdAndUpdate({_id: req.body._id},
             {title: req.body.title,
            content: req.body.content
            });
        try {
            res.status(200).json(await data);
        } catch (error) {
            console.log(error);
        }
    }
}