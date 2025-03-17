const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notesLabelsSchema = new Schema({
    note_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true },
    label_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Label', required: true }
  });
  
  const NotesLabels = mongoose.model('NotesLabels', notesLabelsSchema);
  
  module.exports = NotesLabels;
  