const jwt = require('jsonwebtoken');

const TOKEN_KEY=process.env.TOKEN_KEY;

const verifyToken=(req,res,next)=>{
    const token=req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(req.body.token,req.query.token,req.headers['x-access-token']);
    if(!token) return res.status(403).send({auth:false,message:"A token is required for authentication",token:null});

    try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        console.log(decoded);
        req.user = decoded;
      } catch (err) {
        return res.status(401).send({auth:false,message:"Invalid token",token:null});
      }
      return next();
}

module.exports=verifyToken;
