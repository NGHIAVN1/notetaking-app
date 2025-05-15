const labelData =require('../models/label');
module.exports ={
    async newLabel(req, res){
        // let user = new mongoose.Types.ObjectId();
        const data = new labelData({
            label_name: req.body.label_name,
            user_id: req.decoded._id
        });
        
        try {
            console.log(data);
           const label_data = await data.save();
            res.status(200).json(label_data);
        } catch (error) {
            console.log(error)
            res.status(404).send("Don't saved data ");
        }
    },
    async getLabels(req, res){
        const data = await labelData.find({user_id: req.decoded._id});
        try {
            console.log(data)
            res.json(data);
        } catch (error) {
            res.send(" Data not found ");

        }
    }
}