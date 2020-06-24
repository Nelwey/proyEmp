const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bancoSchema = new Schema({  
 
  nombre: {
    type: String
  }
});


module.exports = mongoose.model('Banco', bancoSchema); 