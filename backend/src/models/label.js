const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const labelSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    label_name: { type: String, required: true, maxlength: 100 },
    created_at: { type: Date, default: Date.now }
  });
  
  const Label = mongoose.model('Label', labelSchema);
  
  module.exports = Label;
  