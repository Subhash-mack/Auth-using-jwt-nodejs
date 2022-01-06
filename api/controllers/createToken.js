const jwt = require('jsonwebtoken');


module.exports= function createToken(user){
    const {_id,email,phone,address,admin,role}=user;

    return (jwt.sign({
        _id,
        email,
        phone,
        address,
        admin,
        role
      },
      process.env.TOKEN_KEY, {
        expiresIn: process.env.TOKEN_EXPIRATION_TIME,
      }
    ));
}