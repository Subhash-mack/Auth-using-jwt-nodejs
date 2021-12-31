const mongoose = require('mongoose');
const crypto=require('crypto');
const adminSchema = new mongoose.Schema({

    username:  {type:String,required:true},
    email: {type:String,required:true,unique:true},
    address:   {type:String,required:true},
    phone: {type:Number,required:true},
    token: String,
    hash : String,
    salt : String,
    role:{type:String,enum:['super','helpdesk','site'],required:true},
    lastLoginTime:{type:Date,default:null}
});

adminSchema.methods.setPassword = function(password) {
     
       
        this.salt=crypto.randomBytes(16).toString('hex');
       this.hash = crypto.pbkdf2Sync(password, this.salt, 
       1000, 64, `sha512`).toString(`hex`);
       return {salt:this.salt,hash:this.hash}
   };
     
   adminSchema.methods.validPassword = function(password) {
       const hash = crypto.pbkdf2Sync(password, 
       this.salt, 1000, 64, `sha512`).toString(`hex`);
       return this.hash === hash;
   };

module.exports= mongoose.model("admin",adminSchema);