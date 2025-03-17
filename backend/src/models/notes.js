const  mongoose = require('mongoose');
const NotesSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, maxlength: 255, required: false },
  content: { type: String, required: true },
  deleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  labels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Label' }],
  checklists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Checklist' }],
},
    {timestamps: true}
);
module.exports = mongoose.model('notes', NotesSchema);
