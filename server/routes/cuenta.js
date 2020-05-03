const express = require('express');
const router = express.Router();
const Cuenta = require('../models/cuenta');
const {
  verificarToken,
  verificaEjecutivoRol,
} = require('../middlewares/autenticacion');


router.post('/', verificarToken, verificaEjecutivoRol, (req, res, next) => {

  let body = req.body;
  let cuenta = new Cuenta({

    idCliente: body.idCliente,
    nroCuenta: body.nroCuenta,
    monto: body.monto
  });

  cuenta.save((err, cuentaDB) => {
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