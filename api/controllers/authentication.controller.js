const userdb = require('../../models/user');
const jwt = require('jsonwebtoken');
const findOrCreate = require('mongoose-findorcreate');
const createToken=require('./createToken');

module.exports = class AuthController {

  static registerGET = async (req, res) => {
    sendHi(res);
  }
  static registerPOST = async (req, res) => {

    try {
      const {
        username,
        password,
        email,
        address,
        phone
      } = req.body;
      if (!(username && password && email && address && phone)) return res.status(400).send('Input fields missing');

      const userExists = await userdb.findOne({
        email
      });
      if (userExists) return res.status(409).send("User Already Exist. Please Login");

      const user = new userdb();
      user.username = username;
      user.email = email.toLowerCase();
      user.address = address;
      user.phone = phone;
      user.setPassword(password);
      user.save((err, newUser) => {
        if (err) return res.status(400).send("Failed to add user");
      });
      const token=createToken(user);
  
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

      const user = await userdb.findOne({
        email
      })
      if (!user.validPassword(password)) return res.status(401).send({
        auth: false,
        message: "Invalid credentials",
        token: null
      });
      const token=createToken(user);
      user.token = token;
      res.status(200).json(user);
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
  req.headers['x-access-token'] = token;
    res.status(200).send({auth:false,message:"logged out",token:token});
  }


}