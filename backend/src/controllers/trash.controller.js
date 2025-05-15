const dataNote = require('../models/notes');
module.exports = {
  async getTrashItems (req, res) {
    try {
      // Only fetch notes belonging to the authenticated user
      const notes = await dataNote.find({ user_id: req.decoded._id, deleted: true })
        .populate('checklists')  // This populates the checklist items
        .sort({ updatedAt: -1 }); // Sort by most recently updated

      res.status(200).json(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  },
  async  deleteTrashItem(req, res){
          const data =  await dataNote.findOneAndDelete({
              _id: req.body._id,
              collectionId: req.body.collectionId
          });
          try {
              await data;
              res.send('delete success')
          } catch (error) {
              console.log(error);
          }
      },
  async restoreTrashItem(req, res){
          const data = await dataNote.findByIdAndUpdate(
              req.body._id,
              { deleted: false },
          );
          try {
              res.status(200).json(data);
          } catch (error) {
              console.log(error);
              res.status(500).json({ error: "Failed to restore note" });
          }
      },
}