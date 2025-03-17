const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const trashSchema = new Schema({
    note_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true },
    deleted_at: { type: Date, default: Date.now }
  });
  
  const Trash = mongoose.model('Trash', trashSchema);
  
  module.exports = Trash;
  