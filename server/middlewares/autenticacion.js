const jwt = require('jsonwebtoken');



//Verificar token
let verificarToken = (req, res, next) => {
  let token = process.env.TOKEN;

  jwt.verify(token, process.env.SEED, (err, decoded) => {

    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Token no valido'
        }
      });
    }

    req.usuario = decoded.usuario;
    next();
  });


}

//Verifica AdminRole

let verificaEjecutivoRol = (req, res, next) => {

  let usuario = req.usuario;
  if (usuario.rol === 'ejecutivo') {
    next();
  } else {
    return res.json({
      ok: false,
      err: {
        message: 'El usuario no es ejecutivo'
      }
    });
  }
}



module.exports = {
  verificarToken,
  verificaEjecutivoRol
}