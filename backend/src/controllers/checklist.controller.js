const ChecklistItem = require('../models/checklistitems');
const dataNote = require('../models/notes')
module.exports = {
    // Create a new checklist and associate with a note
// Add these functions to your module.exports
async createChecklistNotes(req, res) {
    try {
      const { title, checklist_items } = req.body;
      const checklistIds = [];

      if (checklist_items && Array.isArray(checklist_items)) {
        for (const item of checklist_items) {
          const newItem = new ChecklistItem({
            content: item.content || item.text,
            is_checked: item.is_checked || false, 
            user_id: req.decoded._id
          });
          const savedItem = await newItem.save();
          checklistIds.push(savedItem._id); // Store the ObjectId
        }
      }
      // Create new note with checklist data
      const newNote = new dataNote({
        title,
        type: 'checklist',
        user_id: req.decoded._id,
        checklists: checklistIds
      
      });
      
      // Save to database
      const savedNote = await newNote.save();
      
      return res.status(201).json({
        success: true,
        message: "Note with checklists created successfully",
        note: savedNote
      });
      
    } catch (error) {
      console.error("Error creating note with checklists:", error);
      
      // Check for MongoDB validation errors
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          error: "Validation error", 
          details: Object.values(error.errors).map(err => err.message)
        });
      }
      
      // Check for cast errors (often related to invalid ObjectIds)
      if (error.name === 'CastError') {
        return res.status(400).json({ 
          error: "Invalid data format",
          details: `Invalid ${error.path}: ${error.value}`
        });
      }
      
      // Generic server error
      return res.status(500).json({ 
        error: "Failed to create note with checklists",
        message: process.env.NODE_ENV === 'production' 
          ? "An unexpected error occurred" 
          : error.message
      });
    }
  },
// Get all notes with populated checklists
async ReadNotes(req, res) {
  try {
    // Only fetch notes belonging to the authenticated user
    const notes = await dataNote.find({ user_id: req.decoded._id })
      .populate('checklists')  // This populates the checklist items
      .sort({ updatedAt: -1 }); // Sort by most recently updated
    
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
},

// Get a single note with populated checklists
async GetNoteById(req, res) {
  try {
    const note = await dataNote.findOne({
      _id: req.params.id,
      user_id: req.decoded._id 
    }).populate('checklists');
    
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: "Invalid note ID format" });
    }
    
    res.status(500).json({ error: "Failed to fetch note" });
  }
},

// Get all notes with checklists only (filter)
async GetChecklistNotes(req, res) {
  try {
    const notes = await dataNote.find({
      user_id: req.decoded._id,
      checklists: { $exists: true, $not: { $size: 0 } }  // Only notes with checklists
    }).populate('checklists');
    
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching checklist notes:", error);
    res.status(500).json({ error: "Failed to fetch checklist notes" });
  }
},

// Update a single checklist item
async updateChecklistItem(req, res) {
  try {
    const { id } = req.params;
    const { content, is_checked } = req.body; // Changed from isChecked to is_checked
    
    console.log("Updating checklist item:", id, "with data:", req.body);
    
    // Find the checklist item
    const checklistItem = await ChecklistItem.findById(id);
    
    if (!checklistItem) {
      return res.status(404).json({ error: "Checklist item not found" });
    }
    
    // Update the fields
    if (content !== undefined) checklistItem.content = content;
    if (is_checked !== undefined) checklistItem.is_checked = is_checked; // Changed from isChecked to is_checked
    
    // Save the updated item
    const updatedItem = await checklistItem.save();
    
    console.log("Updated item:", updatedItem);
    
    res.status(200).json({
      success: true,
      message: "Checklist item updated successfully",
      item: updatedItem
    });
    
  } catch (error) {
    console.error("Error updating checklist item:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: "Invalid checklist item ID format" });
    }
    
    res.status(500).json({ error: "Failed to update checklist item" });
  }

},

// Add a new checklist item to an existing note
async addChecklistItem(req, res) {
  try {
    const { content, note_id } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }
    
    // Find the note to make sure it exists and belongs to the user
    const note = await dataNote.findOne({
      _id: note_id,
      user_id: req.decoded._id
    });
    
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    
    // Create the new checklist item
    const newItem = new ChecklistItem({
      content,
      is_checked: false
    });
    
    // Save the new item
    const savedItem = await newItem.save();
    
    // Add the new item to the note's checklists array
    note.checklists.push(savedItem._id);
    await note.save();
    
    return res.status(201).json({
      success: true,
      message: "Checklist item added successfully",
      item: savedItem
    });
  } catch (error) {
    console.error("Error adding checklist item:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: "Validation error", 
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        error: "Invalid data format",
        details: `Invalid ${error.path}: ${error.value}`
      });
    }
    
    return res.status(500).json({ 
      error: "Failed to add checklist item",
      message: process.env.NODE_ENV === 'production' 
        ? "An unexpected error occurred" 
        : error.message
    });
  }
},

// Delete a checklist item
async deleteChecklistItem(req, res) {
  try {
    const { id } = req.params;
    
    // Find and delete the checklist item
    const deletedItem = await ChecklistItem.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return res.status(404).json({ error: "Checklist item not found" });
    }
    
    // Remove reference from any notes that contain this item
    await dataNote.updateMany(
      { checklists: id },
      { $pull: { checklists: id } }
    );
    
    return res.status(200).json({
      success: true,
      message: "Checklist item deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting checklist item:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: "Invalid checklist item ID format" });
    }
    
    return res.status(500).json({ error: "Failed to delete checklist item" });
  }
}
  
};