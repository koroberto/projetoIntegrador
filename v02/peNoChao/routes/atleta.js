var express = require('express');
var router = express.Router();

var AtletaController = require('../controllers/AtletaController');

router.get('/', AtletaController.view);

module.exports = router;
