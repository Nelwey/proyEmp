const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let cuentaTiendaSchema = new Schema({
  idTienda: {
    type: Schema.Types.ObjectId,
    ref: 'Tienda',
    required: true
  },
  nroCuenta: {
    type: String,
    required: [true, 'El numero de cuenta es necesario']
  },
  monto: {
    type: Number,
    default: 100
  }
});

module.exports = mongoose.model('CuentaTienda', cuentaTiendaSchema);