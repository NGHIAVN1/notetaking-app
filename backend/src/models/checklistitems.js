const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema({
    content: { type: String, required: true },
    is_checked: { type: Boolean, default: false }
  });
  
  const ChecklistItem = mongoose.model('ChecklistItem', checklistItemSchema);
  
  module.exports = ChecklistItem;
  