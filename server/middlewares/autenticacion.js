const jwt = require('jsonwebtoken');

//Verificar token
let verificarToken = (req, res, next) => {

  if (req.headers.authorization == null) {
    return res.status(400).send('Token vacio');
  }

  let token = req.headers.authorization.split(' ')[1]; // authorization
  // let token = req.header('token'); 

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

  let usuarioDB = req.usuario;
  if (usuarioDB.rol === 'ejecutivo') {
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

let verificaAdminRol = (req, res, next) => {

  let usuarioDB = req.usuario;
  if (usuarioDB.rol === 'admin') {
    next();
  } else {
    return res.json({
      ok: false,
      err: {
        message: 'El usuario no es administrativo'
      }
    });
  }
}





module.exports = {
  verificarToken,
  verificaEjecutivoRol,
  verificaAdminRol
}