const dataNote = require('../models/notes');
const fs = require('fs');

module.exports= {
    async CreateNotes(req, res){
   

        // const getImageName = files.image.originalFilename;
        // const randomNumber = Math.floor(Math.random() * 999999);
        // const newImageName = randomNumber + getImageName;
        // console.log(process.env.DIR_PATH);
        // const newPath = path.join(
        //   process.env.DIR_PATH,
        //   process.env.NEW_PATH,
        //   newImageName
        // );
  
        // console.log('newpath string :' + newPath);
        // files.image.originalFilename = newImageName;
        
        // console.log(req.decoded._id)
        console.log("www" + req.file);
        const data = new dataNote({
            user_id: req.decoded._id,
            title: req.body.title,
            image: req.file,
            content: req.body.content,
            collectionId: req.body.collectionId
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