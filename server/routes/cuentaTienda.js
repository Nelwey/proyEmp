const express = require('express');
const router = express.Router();
const cuentaTienda = require('../models/cuentaTienda');
const {
  verificarToken,
  verificaAdminRol,
} = require('../middlewares/autenticacion');


router.post('/', (req, res, next) => {

  let body = req.body;
  let cuentatienda = new cuentaTienda({

    idTienda: body.idTienda,
    nroCuenta: body.nroCuenta,
    monto: body.monto
  });

  cuentatienda.save((err, cuentaDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      cuenta: cuentaDB
    });
  });
});
module.exports = router;