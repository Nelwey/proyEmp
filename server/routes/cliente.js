const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');
const {
  verificaEjecutivoRol,
  verificarToken
} = require('../middlewares/autenticacion');


router.get('/:ci', verificarToken, verificaEjecutivoRol, (req, res, next) => {
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
      // res.status(201).json({
      //   ok: true,
      //   cliente: clienteDB
      // });
      res.status(201);
      res.send('El ci es valido');
    });

});

router.post('/', verificarToken, verificaEjecutivoRol, (req, res, next) => {

  let body = req.body;
  let cliente = new Cliente({

    ci: body.ci,
    nombres: body.nombres,
    apellidos: body.apellidos,
    direccion: body.direccion,
    telefono: body.telefono
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

router.put('/:ci', verificarToken, verificaEjecutivoRol, async (req, res) => {

  let ci = req.params.ci;
  let codigo_huella = req.body;
  const cliente = await Cliente.findOne({ci});
  if (!cliente) {
    return res.status(404).json({
      ok: false,
      message: 'No existe el cliente en la bd'
    });
  } else {
    Cliente.findByIdAndUpdate(cliente._id, codigo_huella, { new: true})
    .exec()
    .then(result => {
      // res.status(200).json({
      //   ok: true,
      //   message: `codigo de huella actualizada correctamente!`,
      //   result
      // });
      res.status(200);
      res.send('codigo de huella actualizada correctamente!');
    })
    .catch(err => {
      res.status(500).json({
        ok: false,
        error: err
      });
    });
  }
});

module.exports = router;