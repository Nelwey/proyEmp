const env = require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars')

var app = express();

var loginRouter = require('./routes/login');
var indexRouter = require('./routes/index');
var usuarioRouter = require('./routes/usuario');
var clienteRouter = require('./routes/cliente');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

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


mongoose.connect(env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, res) => {
  if (err) throw err;
  console.log('Base de datos ONLINE');

});



app.listen(env.PORT, () => console.log(`listening port: ${env.PORT}`));