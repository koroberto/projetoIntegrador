var express = require('express');
var router = express.Router();
var LoginController = require('../controllers/LoginController');
var CadastroController = require('../controllers/CadastroController');
var JogosController = require('../controllers/JogosController');
var TimesController = require('../controllers/TimesController');

/* GET home page. */
router.get('/', LoginController.login);

router.get('/cadastro', CadastroController.cadastro);
router.post('/cadastro', CadastroController.store);

router.get('/jogos', JogosController.jogos);
router.get('/times', TimesController.times);


//Abaixo temos o codigo inicial criado pelo express generator
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
