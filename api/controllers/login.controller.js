const userdb=require('../../models/user');
const jwt=require('jsonwebtoken');

module.exports= class LoginController{

    static LoginGET =  async (req,res)=>{
        res.send("hello peter");
}
static LoginPOST= async(req,res)=>{

    try{
        const {email,password}=req.body;
        if (!(email && password)) return res.status(400).send({auth:false,message:"All input is required",token:null});

        const user = await userdb.findOne({email})
        if(!user.validPassword(password)) return res.status(401).send({auth:false,message:"Invalid credentials",token:null});
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "30m",
            }
          );
          user.token = token;
        res.status(200).json(user);
}
catch(err){
    console.log(err);
}
}

static home=async(req,res)=>{
    res.status(200).send({auth:true,message:"Successfully logged in"});
}
}