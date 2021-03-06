// ===================================
//PUERTO
//====================================
const PORT = process.env.PORT || 3000;


// ===================================
//ENTORNO
//====================================
// VARIABLE QUE HEROKU RECONOCE
const ENVIRONMENT = process.env.NODE_ENV || 'dev';


process.env.CADUCIDAD_TOKEN = '1h';

// ===================================
//SEED  de autenticacion
//====================================
process.env.SEED = process.env.SEED || 'seed_desarrollo';



// ===================================
//BASE DE DATOS
//====================================
//SI EL ENVIRONMENT ES DEV ENTONCES SE TRABAJA CON LA BD LOCAL (QUIERE DECIR QUE NO ESTOY TRABAJANDO EN LA NUBE)

var URLDB;
if (ENVIRONMENT === 'dev') {
  URLDB = 'mongodb://localhost:27017/pempresarialbd';
  // URLDB = 'mongodb+srv://nelwey:nelwey@cluster0-zzplm.mongodb.net/pempresarialbd?retryWrites=true&w=majority';
} else {
  URLDB = process.env.MONGO_URI;
}


module.exports = {

  PORT,
  ENVIRONMENT,
  URLDB

}