const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let cuentaSchema = new Schema({
  idCliente: {
    type: Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  nroCuenta: {
    type: String,
    required: [true, 'El numero de cuenta es necesario']
  },
  monto: {
    type: Number,
    default: 10000
  }
});





cuentaSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
});

module.exports = mongoose.model('Cuenta', cuentaSchema);