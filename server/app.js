const env = require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars')
const cors = require('cors');

var app = express();

var loginRouter = require('./routes/login');
var indexRouter = require('./routes/index');
var usuarioRouter = require('./routes/usuario');
var clienteRouter = require('./routes/cliente');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(function(req, res, next) {
  var allowedOrigins = ['http://localhost:8080'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  partialsDir: app.get(path.join(app.get('views'), 'partials')),
  extname: '.hbs'
}));
app.set('view engine', 'hbs');



app.use('/', indexRouter);
app.use('/usuario', usuarioRouter);
app.use('/login', loginRouter);
app.use('/cliente', clienteRouter);
app.use('/cuenta', require('./routes/cuenta'));
app.use('/transaccion', require('./routes/transaccion'));
app.use('/tienda', require('./routes/tienda'));
app.use('/banco', require('./routes/banco'));
app.use('/cuentatienda', require('./routes/cuentaTienda'));


mongoose.connect(env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify:false
}, (err, res) => {
  if (err) throw err;
  console.log('Base de datos ONLINE');

});



app.listen(env.PORT, () => console.log(`listening port: ${env.PORT}`));