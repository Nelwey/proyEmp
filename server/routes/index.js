var express = require('express');
var router = express.Router();

// renderizar navbar index 
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;