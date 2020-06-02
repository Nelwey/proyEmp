const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let tiendaSchema = new Schema({  
 
  nombre: {
    type: String
  }
});


module.exports = mongoose.model('Tienda', tiendaSchema); 