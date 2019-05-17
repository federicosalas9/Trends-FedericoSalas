var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/trends', function(req, res, next) {
  res.render('trends');
});

router.get('/prueba', function(req, res, next) {
  res.render('prueba');
});


module.exports = router;
