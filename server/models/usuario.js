const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = { 
  values: ['admin', 'ejecutivo','comerciante'],
  message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({  
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  ci: {
    type: String,
    unique: true,
    required: [true, 'El CI es necesario']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  rol: {
    type: String,
    default: 'ejecutivo',
    enum: rolesValidos
  },
  tiendaid:{
    type: Schema.Types.ObjectId,
    ref: 'Tienda'
  }
});


usuarioSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
});

module.exports = mongoose.model('Usuario', usuarioSchema); 