var express = require('express');
var router = express.Router();
var LoginController = require('../controllers/LoginController');
var CadastroController = require('../controllers/CadastroController');

/* GET home page. */
router.get('/', LoginController.login);
router.get('/cadastro', CadastroController.cadastro);

//Abaixo temos o codigo inicial criado pelo express generator
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
