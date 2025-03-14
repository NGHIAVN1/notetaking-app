const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Collection_DB = Schema(
    {   
        name: {
            type: String,
            required: true
        },
        userId: {type: Schema.Types.ObjectId, ref: 'user'},
        
    }
)
module.exports= mongoose.model('collections', Collection_DB);
