var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Bienvenido a la api de andruw');
});

module.exports = router;