const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const {
  verificarToken,
  verificaAdminRol,
} = require('../middlewares/autenticacion');


router.post('/', verificarToken, verificaAdminRol, (req, res, next) => {

  let body = req.body;
  let usuario = new Usuario({

    nombre: body.nombre,
    ci: body.ci,
    password: bcrypt.hashSync(body.password, 10),
    rol: body.rol,
    tiendaid:body.tiendaid
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});



module.exports = router;