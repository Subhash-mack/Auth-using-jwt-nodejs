const jwt = require('jsonwebtoken');


module.exports= function createToken(user){
    const {_id,email,phone,address,admin}=user;

    return (jwt.sign({
        _id,
        email,
        phone,
        address,
        admin
      },
      process.env.TOKEN_KEY, {
        expiresIn: process.env.TOKEN_EXPIRATION_TIME,
      }
    ));
}