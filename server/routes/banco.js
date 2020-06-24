const express = require('express');
const router = express.Router();
const Banco = require('../models/banco');
const {
  verificarToken
} = require('../middlewares/autenticacion');


router.post('/', async (req, res, next) => {

  let body = req.body;
  let banco = new Banco({
    nombre: body.nombre
  });

  try {
    const newBanco = await banco.save();
    if (!newBanco) {

      throw new Error('Error al registrar banco');

    } else {
      return res.status(200).json({
        ok: true,
        newBanco
      });
    }
  } catch (error) {
    res.status(404).json({
      ok: false,
      error: error.message
    });
  }

});
module.exports = router;