const express = require('express');
const router = express.Router();
const Tienda = require('../models/tienda');
const {
  verificarToken
} = require('../middlewares/autenticacion');


router.post('/', async (req, res, next) => {


  let body = req.body;
  let tienda = new Tienda({
    nombre: body.nombre
  });

  try {
    const newTienda = await tienda.save();
    if (!newTienda) {

      throw new Error('Error al guardar tienda');

    } else {
      return res.status(200).json({
        ok: true,
        newTienda
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