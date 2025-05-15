const dataNote = require('../models/notes');
const fs = require('fs');
let collectionId = null;
module.exports= {
    async getNotesCollection(req, res){
        try {
            const notes = await dataNote.find({ user_id: req.decoded._id, deleted: false})
            .populate('checklists')  // This populates the checklist items
            .sort({ updatedAt: -1 }); // Sort by most recently updated
          
          res.status(200).json(notes);
        } catch (error) {
          console.error("Error fetching notes:", error);
          res.status(500).json({ error: "Failed to fetch notes" });
        }
    },
    async createNotesCollection(req, res){
        collectionId = req.body.labels;

        const data = new dataNote({
            user_id: req.decoded._id,
            title: req.body.title,
            image: req.file,
            content: req.body.content,
            labels: req.body.labels
        });
            try {
                console.log(req);
                const dataNote = await data.save();
    
                res.status(200).json(dataNote);
            } catch (error) {
                console.log(error)
                res.status(500).send("not found")
            } 
        

    },


        /**
     * Creates a new note with checklist items
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */

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