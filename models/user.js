const{ Schema, model } = require("mongoose");


const UsersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
});

//crear metodos personalizados

// UsuariosSchema.methods.toJSON = function (){
//   const { __v, password,_id,...usuario} = this.toObject()//sacar la version y el password
//   usuario.uid = _id
//   return usuario
// }

module.exports = model("User", UsersSchema)