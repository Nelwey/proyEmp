const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let clienteSchema = new Schema({  
  ci: {
    type: String,
    unique: true,
    required: [true, 'El CI es necesario']
  },
  nombres: {
    type: String,
    required: [true, 'campo nombre obligatorio']
  },
  apellidos: {
    type: String,
    required: [true, 'campo apellidos obligatorio']
  },
  
  direccion: {
    type: String,
    required: [true, 'La direccion es obligatoria']
  },
  telefono: {
    type: String,
    required: [true, 'El telefono es obligatorio']
  },
  codigo_huella: {
    type: String,
    default: ''
  },
  ping: {
    type: String,
    required: [true, 'El ping es obligatorio']
  }
  
});


clienteSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.nro_cuenta;
  return userObject;
}

clienteSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
});

module.exports = mongoose.model('Cliente', clienteSchema); 