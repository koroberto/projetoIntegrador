var express = require('express');
var router = express.Router();
var perfilJogador = require('../controllers/perfilJogadorController');

router.get('/:id', perfilJogador.index);

module.exports = router;
