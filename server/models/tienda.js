const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let tiendaSchema = new Schema({

  nombre: {
    type: String
  },
  idBanco: {
    type: Schema.Types.ObjectId,
    ref: 'Banco'
  }
});


module.exports = mongoose.model('Tienda', tiendaSchema);