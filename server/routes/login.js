const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const Tienda = require('../models/tienda');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// renderizar formulario login
router.get('/', (req, res, next) => {
  res.render('login');
});



router.post('/', async (req, res) => {
  let body = req.body;
  
  try {
    const usuarioDB = await Usuario.findOne({ ci: body.ci});
    if(!usuarioDB){
      throw new Error("(Usuario) o contraseña incorrectos");
    }
    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      throw new Error("Usuario o (contraseña) incorrectos");      
    }

    const tienda = await Tienda.findOne({_id:usuarioDB.tiendaid});
    if(!tienda){
      throw new Error("No hay tienda asignada");
    }else{

      let token = jwt.sign({
        usuario: usuarioDB
      }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
  
  
      res.status(200).json({
        token,
        rol:usuarioDB.rol,
        nombre:usuarioDB.nombre,
        tienda:tienda.nombre
      });

    }
  
  } catch (error) {
    res.status(404).json({
      ok:false,
      error:error.message
    });
  }
});

module.exports = router;