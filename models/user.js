const mongoose = require('mongoose');
const crypto=require('crypto');
const userSchema = new mongoose.Schema({

    username:  {type:String,required:true},
    email: {type:String,required:true,unique:true},
    address:   {type:String,required:true},
    phone: {type:Number,required:true},
    token:String,
    hash : String,
    salt : String
});

userSchema.methods.setPassword = function(password) {
     
    // Creating a unique salt for a particular user
       
        this.salt=crypto.randomBytes(16).toString('hex');
       // Hashing user's salt and password with 1000 iterations,
       //64 length and sha512 digest
       this.hash = crypto.pbkdf2Sync(password, this.salt, 
       1000, 64, `sha512`).toString(`hex`);
       console.log(this.hash,this.salt);
       return({hash:this.hash,salt:this.salt});
   };
     
   // Method to check the entered password is correct or not
   // valid password method checks whether the user
   // password is correct or not
   // It takes the user password from the request 
   // and salt from user database entry
   // It then hashes user password and salt
   // then checks if this generated hash is equal
   // to user's hash in the database or not
   // If the user's hash is equal to generated hash 
   // then the password is correct otherwise not
   userSchema.methods.validPassword = function(password) {
       const hash = crypto.pbkdf2Sync(password, 
       this.salt, 1000, 64, `sha512`).toString(`hex`);
       return this.hash === hash;
   };

module.exports= mongoose.model("user",userSchema);