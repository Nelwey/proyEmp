const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');
const Cuenta = require('../models/cuenta');
const {
  verificaEjecutivoRol,
  verificarToken
} = require('../middlewares/autenticacion');


router.get('/:ci', verificarToken, verificaEjecutivoRol, async (req, res, next) => {
  let ci = req.params.ci;

  try {
    const cliente = await Cliente.findOne({
      ci
    });
    if (!cliente) {
      throw new Error('No existe el cliente en la db');
    } else {
      return res.status(200).json({
        ok: true,
        message: 'El ci es valido'
      });
    }

  } catch (error) {

    res.status(404).json({
      ok: false,
      error: error.message
    });

  }

});

router.post('/cuenta', verificarToken, verificaEjecutivoRol, async (req, res, next) => {

  let body = req.body;

  try {

    let cliente = new Cliente({

      ci: body.ci,
      nombres: body.nombres,
      apellidos: body.apellidos,
      direccion: body.direccion,
      telefono: body.telefono,
    });

    const newCliente = await cliente.save();
    if (!newCliente) {
      throw new Error('No se pudo guardar el cliente');
    } else {

      const clienteBD = await Cliente.findOne({ci: body.ci});

      if (!clienteBD) {
        throw new Error('No se pudo guardar el cliente')
      } else {
        let cuenta = new Cuenta({
          idCliente: clienteBD._id,
          nroCuenta: body.nro_cuenta
        });

        const cuentaNueva = await cuenta.save();
        if (!cuentaNueva) {
          throw new Error('No se pudo crear la cuenta');
        } else {
          return res.status(200).json({
            ok: true,
            message: 'El cliente se creó exitosamente!'
          });
        }
      }
    }

  } catch (error) {
    res.status(404).json({
      ok: false,
      error: error.message
    });
  }
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
  const cliente = await Cliente.findOne({
    ci
  });
  if (!cliente) {
    return res.status(404).json({
      ok: false,
      message: 'No existe el cliente en la bd'
    });
  } else {
    Cliente.findByIdAndUpdate(cliente._id, codigo_huella, {
        new: true
      })
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