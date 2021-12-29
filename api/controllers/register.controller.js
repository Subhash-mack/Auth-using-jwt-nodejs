const userdb=require('../../models/user');
const jwt=require('jsonwebtoken');
const findOrCreate=require('mongoose-findorcreate');
module.exports= class RegisterController{
    
    static registerGET =  async (req,res)=>{
            sendHi(res);
    }
    static registerPOST= async(req,res)=>{

        try{
        const {username,password,email,address,phone}=req.body;
        if(!(username && password && email && address && phone)) return res.status(400).send('Input fields missing');

        const userExists=await userdb.findOne({email});
        if(userExists) return res.status(409).send("User Already Exist. Please Login");
         
        const user=new userdb();
        user.username=username;
        user.email=email;
        user.address=address;
        user.phone=phone;
        user.setPassword(password);
        user.save((err,newUser)=>{
            if(err) return res.status(400).send("Failed to add user");
        });

          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "30m",
            }
          );
          user.token = token;
          res.status(201).json({user,message:"user added successfully"});
        }
        catch(err){
            console.log(err);

        }


    }
    

}