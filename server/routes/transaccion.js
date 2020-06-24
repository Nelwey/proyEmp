const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');
const Cuenta = require('../models/cuenta');
const CuentaTienda = require('../models/cuentaTienda');
const {
  verificaComercianteRol,
  verificarToken
} = require('../middlewares/autenticacion');



router.get('/cliente/:ci', verificarToken, verificaComercianteRol, async (req, res, next) => {
  let ci = req.params.ci;

  try {

    const cliente = await Cliente.findOne({ci});
    
    if (!cliente) {
      throw new Error('No existe el cliente en la db');
    }else{

      const objClienteCuenta = await Cuenta.findOne({idCliente: cliente._id});
      
      return res.status(200).json({
        id: cliente._id,
        ci: cliente.ci,
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
        codigo_huella: cliente.codigo_huella,
        nro_cuenta:objClienteCuenta.nroCuenta
      });

    }

  } catch (error) {

    res.status(404).json({
      ok: false,
      error: error.message
    });
  }

});

router.put('/:id', verificarToken, verificaComercianteRol, async (req, res, next) => {
  const id = req.params.id;
  const monto = req.body.monto;
  const cuentaTiendaId = req.body.cuentaTiendaId;

  const objClienteCuenta = await Cuenta.findOne({idCliente:id});
  if(!objClienteCuenta){
    throw new Error('No existe una cuenta con ese id');
  }else{
    var montoActual = objClienteCuenta.monto;
    if(monto <= montoActual ){
      montoActual = montoActual - monto;
      const montoActualizado = await Cuenta.findOneAndUpdate({idCliente:objClienteCuenta.idCliente}, {monto:montoActual}, {new: true});
      if(!montoActualizado){

        throw new Error('Error, no se pudo realizar la transaccion!');

      }else{
       
        const objcuentaTienda = await CuentaTienda.findOne({_id:cuentaTiendaId});
        if(!objcuentaTienda){

          throw new Error('No existe una cuenta de tienda con ese id');

        }else{

          var montoActualTienda = objcuentaTienda.monto;
          montoActualTienda = montoActualTienda + monto;
          const montoActualizadoTienda = await CuentaTienda.findOneAndUpdate({_id:cuentaTiendaId}, {monto:montoActualTienda}, {new: true});
          if(!montoActualizadoTienda){
            throw new Error('Error, no se pudo realizar la transaccion!');
          }else{

            res.status(200);
            res.send('Transaccion realizada correctamente!');

          }

        }
       
      }
  
    }else{
      throw new Error('No tiene fondos suficientes');
    }
  }
});



module.exports = router;