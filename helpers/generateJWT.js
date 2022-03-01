const jwt = require('jsonwebtoken')
require("dotenv").config();

const generateJWT = ( uid, name )=>{

  return new Promise((resolve,reject) =>{

    const payload = { uid, name };

    jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
      expiresIn: '3h'
    }, (err, token) =>{
      if(err){
        console.log(err);
        reject('no se pudo generar el token')
      }
      resolve(token)
    });

  })

}

module.exports = {
  generateJWT
}