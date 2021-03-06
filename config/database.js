const mongoose=require('mongoose');

exports.connect= ()=>{
    mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`)
    .then(()=>console.log("Successfully connected to db"))
    .catch(err=>{
        console.log("failed to connect to db");
        console.error(err);
        process.exit(1);
    })
}