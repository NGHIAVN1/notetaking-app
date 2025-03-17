const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
    note_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true },
    created_at: { type: Date, default: Date.now },
    items: [checklistItemSchema]
  });
  
  const Checklist = mongoose.model('Checklist', checklistSchema);
  
  module.exports = Checklist;
  