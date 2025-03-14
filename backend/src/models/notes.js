const  mongoose = require('mongoose');
const NotesSchema = new mongoose.Schema({
    title: String,
    content: String,
    collectionID: {type: mongoose.Types.ObjectId, ref: 'collections'}
},
    {timestamps: true}
);
module.exports = mongoose.model('notes', NotesSchema);
