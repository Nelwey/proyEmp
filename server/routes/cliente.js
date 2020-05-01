const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');
const {
  verificaEjecutivoRol,
  verificarToken
} = require('../middlewares/autenticacion');


router.get('/:ci', verificarToken, (req, res, next) => {
  let ci = req.params.ci;

  Cliente.findOne({
      ci
    })
    .exec((err, clienteDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }
      if (!clienteDB) {
        res.status(400).json({
          ok: false,
          err: {
            message: 'No existe el cliente en la db'
          }
        });
      }
      res.status(201).json({
        ok: true,
        cliente: clienteDB
      });
    });

});



router.post('/', verificarToken, verificaEjecutivoRol, (req, res, next) => {

  let body = req.body;
  let cliente = new Cliente({

    ci: body.ci,
    nombres: body.nombres,
    apellidos: body.apellidos,
    direccion: body.direccion,
    telefono: body.telefono,
    nro_cuenta: body.nro_cuenta
  });

  cliente.save((err, clienteDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      usuario: clienteDB
    })
  });
});

module.exports = router;