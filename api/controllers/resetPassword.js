const admindb = require('../../models/admin');
const userdb=require('../../models/user');

const resetPassword = async (req,res)=>{
    const {email,password}=req.body;
    const admin=req.user.admin;

    const db=(!admin)?userdb:admindb;
    const user= await db.findOne({email});
    if(user.validPassword(password)) return res.send({message:"new password cannot be same as old",auth:true})
    const {hash,salt}=user.setPassword(password);
    const ans=await user.updateOne({hash,salt});
    if(!ans.acknowledged) return res.status(400).send({message:"Password updation failed. Try again",auth:true});
    res.status(201).send({message:"Password updated successfully",auth:true});
    

    

}

module.exports=resetPassword;