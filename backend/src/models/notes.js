const  mongoose = require('mongoose');
const ChecklistItem = require('./checklistitems');
const NotesSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, maxlength: 255, required: false },
  image: { type: String, required: false, default: undefined },
  content: { type: String, required: false, default: undefined},
  checklists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChecklistItem' }],
  type: { type: String, enum: ['text', 'checklist'], default: 'text' },
  deleted: { type: Boolean, default: false },
  labels: { type: mongoose.Schema.Types.ObjectId, ref: 'Label' },
},
    {timestamps: true}
);
module.exports = mongoose.model('notes', NotesSchema);
