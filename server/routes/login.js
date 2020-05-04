const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// renderizar formulario login
router.get('/', (req, res, next) => {
  res.render('login');
});



router.post('/', (req, res) => {


  let body = req.body;
  Usuario.findOne({
    ci: body.ci
  }, (err, usuarioDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    //si no existe el usuario
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: '(Usuario) o contraseña incorrectos'
        }
      });
    }

    //si la contraseña es erronea
    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      // return res.status(400).json({
      //   ok: false,
      //   err: {
      //     message: 'Usuario o (contraseña) incorrectos'
      //   }
      // });
      res.status(400);
      return res.send('Usuario o (contraseña) incorrectos');
      
    }

    let token = jwt.sign({
      usuario: usuarioDB
    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

    // res.status(200).json({
    //   token,
    //   usuarioDB
    // });
    res.status(200);
    res.send(token);
    // res.send(`Bienvenido al sistema ${usuarioDB.nombre}`);
    
  });
});





router.get('/logout', (req, res, next) => {
  res.json({
    message: 'Sesion cerrada'
  });
})



module.exports = router;