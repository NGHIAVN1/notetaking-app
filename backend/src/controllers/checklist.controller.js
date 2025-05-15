const ChecklistItem = require('../models/checklistitems');
const dataNote = require('../models/notes')
module.exports = {
    // Create a new checklist and associate with a note
// Add these functions to your module.exports
async createChecklistNotes(req, res) {
    try {
      // const checklistIds = [];
      const { title, checklist_items } = req.body;
      const checklistIds = [];

      if (checklist_items && Array.isArray(checklist_items)) {
        for (const item of checklist_items) {
          const newItem = new ChecklistItem({
            content: item.content || item.text,
            isChecked: item.isChecked || false,
            user_id: req.decoded._id // Important: Associate with the current user
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
      
      // Respond with the created resource and 201 Created status
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
      user_id: req.decoded._id  // Security: ensure user can only access their own notes
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
    const { content, isChecked } = req.body;
    
    // Find the checklist item
    const checklistItem = await ChecklistItem.findById(id);
    
    if (!checklistItem) {
      return res.status(404).json({ error: "Checklist item not found" });
    }
    
    // Update the fields
    if (content !== undefined) checklistItem.content = content;
    if (isChecked !== undefined) checklistItem.isChecked = isChecked;
    
    // Save the updated item
    const updatedItem = await checklistItem.save();
    
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
}
  
};