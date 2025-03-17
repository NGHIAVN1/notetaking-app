const dataNote = require('../models/notes')
module.exports= {
    async CreateNotes(req, res){
        const data = new dataNote({ 
            title: req.body.title,
            content: req.body.content,
            collectionId: req.body.collectionId
        });
        try {
            const dataNote = await data.save();
            console.log(dataNote);
            res.json(dataNote);
        } catch (error) {
            res.status(400).send("not found")
        } 
    },

    async ReadNotes(req, res){
    const data = await dataNote.find({});
    try {
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send("Note not found");
    }

},
    async  DeleteNotes(req, res){
        const data =  dataNote.findOneAndDelete({
            _id: req.body._id,
            collectionId: req.body.collectionId
        });
        try {
            await data;
            res.send('delete success')
        } catch (error) {
            console.log(error);
        }
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