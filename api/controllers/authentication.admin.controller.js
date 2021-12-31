const admindb = require('../../models/admin');
const findOrCreate = require('mongoose-findorcreate');
const createToken=require('./createToken');

module.exports = class AuthAdminController {

  static registerGET = async (req, res) => {
    sendHi(res);
  }
  static registerPOST = async (req, res) => {

    try {
      let {
        username,
        password,
        email,
        address,
        phone,
        role
      } = req.body;

      if(role.toLowerCase()!=='super') password=process.env.DEFAULT_PASSWORD;
      if (!(username && password && email && address && phone)) return res.status(400).send('Input fields missing');

      const userExists = await admindb.findOne({
        email
      });
      if (userExists) return res.status(409).send("User Already Exist. Please Login");

      const user = new admindb();
      user.username = username;
      user.email = email.toLowerCase();
      user.address = address;
      user.role=role.toLowerCase();
      user.phone = phone;
      user.setPassword(password);
      user.save((err, newUser) => {
        if (err) console.log("Failed to add user",err);
      });
      user.admin=true;
      const token = createToken(user);
      user.token = token;
      res.status(201).json({
        user,
        message: "user added successfully",
        token:token
      });
    } catch (err) {
      console.log(err);

    }


  }

  static loginGET = async (req, res) => {
    res.status(200).send({
      auth: true,
      message: "Successfully logged in"
    });
  }
  static loginPOST = async (req, res) => {

    try {
      const {
        email,
        password
      } = req.body;

      if (!(email && password)) return res.status(400).send({
        auth: false,
        message: "All input is required",
        token: null
      });

      const user = await admindb.findOne({
        email
      });
      
      if (!user || !user.validPassword(password)) return res.status(401).send({
        auth: false,
        message: "Invalid credentials",
        token: null
      });
      user.admin=true;
      const token = createToken(user);
      user.token = token;
      let resetPassword=false;
      if(user.role!=='super' && user.lastLoginTime==null) resetPassword=true;
      await user.updateOne({lastLoginTime:new Date()});
      res.status(200).json({user,resetPassword,auth:true});
    } catch (err) {
      console.log(err);
    }
  }


  static logoutGET= async(req,res)=>{
    const token = jwt.sign({
      user_id: ""
    },
    process.env.TOKEN_KEY, {
      expiresIn: "1",
    }
  );
  req.user.token = token;
    res.status(200).send({auth:false,message:"logged out",token:token});
  }


}
