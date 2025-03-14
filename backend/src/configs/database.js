const mongoose= require('mongoose');
require("dotenv").config({path: '.env'});
ConnectDb().catch(
    (err) =>{
        console.log(err);
    }
)
async function ConnectDb(){
await  mongoose.connect(process.env.MONGODB_URI).then(
    console.log(process.env.MONGODB_URI)
).catch(
    (err)=>console.log(err)
);
};
module.exports = ConnectDb();
  